/*
 * require the basic environmental variables and packages
 */
var process_env = require('../environment').variables();
var mysql = require('mysql');


/*
 * GET home page.
 */
 exports.index = function(req, res){
	var client = mysql.createClient({
		user:     process_env.MYSQL_USER,
		database: process_env.MYSQL_DATABASE,
		password: process_env.MYSQL_PASSWORD,
		host:     process_env.MYSQL_HOST
	});

	var queryString = 'SELECT count(*) as count FROM stats_201241 where os like "%xp%" and productver = 1';
 
	client.query(queryString, function(err, rows, fields) {
		if (err) throw err;
 
		res.write('Number of AV12 on XP week 41 in 2012: ' + rows[0].count + '\n');
		res.end();
	});
 
	client.end();
	//index', { title: 'Express' });
};
