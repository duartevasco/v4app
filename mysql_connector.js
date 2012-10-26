var mysql = require('mysql')
var process_env = require('./environment').variables();

exports.connect_to_mysql = function(){
	var client = mysql.createClient({
		user:     process_env.MYSQL_USER,
		database: process_env.MYSQL_DATABASE,
		password: process_env.MYSQL_PASSWORD,
		host:     process_env.MYSQL_HOST
	});
	return client
}
