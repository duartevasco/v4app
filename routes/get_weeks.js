
var process_env = require('../environment').variables();
var mysql = require('mysql');

function get_all_weeks_in_array(rows){
	var weeks = new Array()
	for (var i in rows) {
		var table_name = rows[i].Tables_in_stats
		var week = table_name.substring(10, 12)
		var year = table_name.substring(6, 10)
		weeks.push({
			href: '/get/total/count/'+ year +'/'+ week,
			title: 'totals for year '+ year +' and week '+ week
		})
	}
	return weeks
}


exports.get_all_weeks = function(req, res) {
	
	var client = mysql.createClient({
		user:     process_env.MYSQL_USER,
		database: process_env.MYSQL_DATABASE,
		password: process_env.MYSQL_PASSWORD,
		host:     process_env.MYSQL_HOST
	});

	var queryString = 'show tables where Tables_in_stats like "stats_%"';
 
	client.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		var weeks = get_all_weeks_in_array( rows )
		res.render('list_weeks', {title: 'List all weeks', weeks: weeks});
	});
 
	client.end();
}
