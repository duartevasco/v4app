
exports.variables = function(node_env) {
	var environment = node_env || process.env.NODE_ENV
	
	if (!environment) {
		console.error("NODE_ENV is not set")
		return
	}
	
	var port = process.env.PORT || 3000
	var user = process.env.V4_DB_USER || process.env.USER

	if (environment.toLowerCase() === 'development') {
		return {
			NODE_ENV: environment,
			PORT: port,
			MYSQL_USER: user,
			MYSQL_DATABASE: 'stats',
			MYSQL_HOST: 'localhost',
			MYSQL_PASSWORD: process.env.V4_DB_PWD
	
		}
	}
	if (environment.toLowerCase() === 'production') {
		return {
			NODE_ENV: environment,
			PORT: port,
			MYSQL_USER: '',
			MYSQL_DATABASE: 'stats',
			MYSQL_HOST: '',
			MYSQL_PASSWORD: ''
		}
	}
	return {
		NODE_ENV: '',
		PORT: 0,
		MYSQL_USER: '',
		MYSQL_DATABASE: '',
		MYSQL_HOST: '',
		MYSQL_PASSWORD: ''
	}
}
