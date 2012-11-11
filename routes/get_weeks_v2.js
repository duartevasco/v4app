var process_env = require('../environment').variables();
var db = require('../mysql_connector').new_db();

var get_all_weeks_in_array = function(rows){
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

var handler = function(req, res, next, rows) {
	var weeks = get_all_weeks_in_array( rows )
	res.render('list_weeks', {title: 'List all weeks', weeks: weeks});
}

exports.get_all_weeks = function(req, res, next) {
	var queryString = 'show tables where Tables_in_stats like "stats_%"';
	
	db.init(req, res, next)
	db.query(queryString, handler)
}

