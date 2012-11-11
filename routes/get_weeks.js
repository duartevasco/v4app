var process_env = require('../environment').variables();
var mysql = require('mysql');
var mysql_connector = require('../mysql_connector');
var res_local = null;

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

function handle_and_render_all_weeks_graph( err, rows, fields){
	if (err) {
       	client.end();
      	throw err;
	}
	var weeks = get_all_weeks_in_array( rows )
	res_local.render('list_weeks', {title: 'List all weeks', weeks: weeks});
	client.end();
} 


exports.get_all_weeks = function(req, res, next) {
	res_local = res
	
	client = mysql_connector.connect_to_mysql()
	var queryString = 'show tables where Tables_in_stats like "stats_%"';
 	client.query(queryString, handle_and_render_all_weeks_graph );

    //db.query(queryString, req, res, next, handle_and_render_all_weeks_graph)
}
