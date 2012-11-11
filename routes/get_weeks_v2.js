var process_env = require('../environment').variables();
var db = require('../mysql_connector').new_db();

var extract_week_from_table_name = function( table_name ) {
	return table_name.substring(10, 12)
}

var extract_year_from_table_name = function( table_name ) {
	return table_name.substring(6, 10)
} 

var build_title_and_link_to_display = function( week, year ) {
	return {
		href: '/get/total/count/'+ year +'/'+ week,
		title: 'totals for year '+ year +' and week '+ week
	}
}

var get_all_weeks_in_array = function(rows){
	var weeks = new Array()
	for (var i in rows) {
		var table_name = rows[i].Tables_in_stats
		var week = extract_week_from_table_name( table_name )
		var year = extract_year_from_table_name( table_name )
		weeks.push( build_title_and_link_to_display( week, year ) )
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

