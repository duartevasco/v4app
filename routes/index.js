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

	var queryString = 'SELECT * FROM continent_filter';
 
	client.query(queryString, function(err, rows, fields) {
		if (err) throw err;
 
		for (var i in rows) {
			res.write('Post Titles: ' + rows[i].description + '\n');
		}
		res.end();
	});
 
	client.end();
	//index', { title: 'Express' });
};
