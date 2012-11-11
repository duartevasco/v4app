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

exports.new_db = function() {
	var DB = function() {
		this.client = undefined
	}

	DB.prototype.init = function(req, res, next) {
		this.req = req
		this.res = res
		this.next = next
	}

	DB.prototype.connect = function() {
		if (this.client) {
			return
		}

		this.client = mysql.createClient({
			user:     process_env.MYSQL_USER,
			database: process_env.MYSQL_DATABASE,
			password: process_env.MYSQL_PASSWORD,
			host:     process_env.MYSQL_HOST
		});
	}
	
	DB.prototype.disconnect = function() {
		this.client.end()
		this.client = undefined
	}

	DB.prototype.query = function(queryString, callback) {
		var that = this
		that.connect()
		that.client.query(queryString, function(err, rows, fields){
			if (err) {
				that.next(err)
				return
			}

			callback(
				that.req,
				that.res,
				that.next,
				rows)

			that.disconnect()
		})
	}

	return new DB() 
}
