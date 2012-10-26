var process_env = require('../environment').variables();
var mysql = require('mysql');
var mysql_connector = require('../mysql_connector');

exports.week_count = function(req, res) {
	var year = req.params.year
	var week = req.params.week
	
//	var client = mysql.createClient({
//		user:     process_env.MYSQL_USER,
//		database: process_env.MYSQL_DATABASE,
//		password: process_env.MYSQL_PASSWORD,
//		host:     process_env.MYSQL_HOST
//	});
	var client = mysql_connector.connect_to_mysql()

	var queryString = 'SELECT count(*) as count FROM stats_'+ year + week +' where os like "%xp%" and productver = 1';
 
	client.query(queryString, function(err, rows, fields) {
		if (err) {
            client.end();
            throw err;
		}
		res.write(queryString +'\n')
		res.write('Number of AV12 on XP week '+ week +' in '+ year +': ' + rows[0].count + '\n');
		res.end();
	});
 
	client.end();
}
