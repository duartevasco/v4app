
exports.variables = function(node_env) {
	var environment = node_env || process.env.NODE_ENV

	if (!environment) {
		console.error("NODE_ENV is not set, setting it to 'development'")
		environment = 'development'
	}
	
	var port = process.env.PORT || 3000
	var user = process.env.USER
    var mysql_host = process.env.MYSQL_HOST || 'localhost'
    var mysql_password = process.env.MYSQL_PASSWORD || ''

	if (environment.toLowerCase() === 'development') {
		return {
			NODE_ENV: environment,
			PORT: port,
                        WEBHOST: 'localhost',
			MYSQL_USER: user,
			MYSQL_DATABASE: 'stats',
			MYSQL_HOST: mysql_host,
			MYSQL_PASSWORD: mysql_password
		}
	}
	if (environment.toLowerCase() === 'production') {
		return {
			NODE_ENV: environment,
			PORT: port,
                        WEBHOST: 'localhost',
			MYSQL_USER: 'remote_stats_ro',
			MYSQL_DATABASE: 'stats',
    		MYSQL_HOST: mysql_host,
			MYSQL_PASSWORD: mysql_password
		}
	}
	if (environment.toLowerCase() === 'test') {
		return {
			NODE_ENV: environment,
			PORT: port,
                        WEBHOST: 'localhost',
			MYSQL_USER: user,
			MYSQL_DATABASE: 'stats',
    			MYSQL_HOST: mysql_host,
			MYSQL_PASSWORD: mysql_password
		}
	}
}
