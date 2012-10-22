
exports.variables = function(node_env) {
	var environment = node_env || process.env.NODE_ENV
	
	if (!environment) {
		console.error("NODE_ENV is not set")
		return
	}
	
	var port = process.env.PORT
	
	if (environment.toLowerCase() === 'development') {
		return {
			NODE_ENV: environment,
			PORT: port,
			MYSQL_USER: process.env.USER,
			MYSQL_DATABASE: 'stats',
			MYSQL_HOST: 'localhost'
		}
	}
	if (environment.toLowerCase() === 'production') {
		return {
			NODE_ENV: environment,
			PORT: port,
			MYSQL_USER: '',
			MYSQL_DATABASE: 'stats',
			MYSQL_HOST: ''
		}
	}
	return {
		NODE_ENV: '',
		PORT: 0,
		MYSQL_USER: '',
		MYSQL_DATABASE: '',
		MYSQL_HOST: ''
	}
}