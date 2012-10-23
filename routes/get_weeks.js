
var process_env = require('../environment').variables();
var mysql = require('mysql');

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
		res.write(queryString +'\n')
		for (var i in rows) {
			res.write('table '+ rows[i].Tables_in_stats + '\n');
		}
		res.end();
	});
 
	client.end();
}