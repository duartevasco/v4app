
var getAllWeeksTestSteps = function () {
  this.World = require("../support/world.js").World; // overwrite default World constructor

  this.Given(/^I am on the Get All Weeks page$/, function(callback) {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a new this.World instance.
    // i.e. you may use this.browser to execute the step:

    this.visit(this.webhost + '/get/all/weeks', callback);

    // The callback is passed to visit() so that when the job's finished, the next step can
    // be executed by Cucumber.
  });

  this.Then(/^I should see as many query links as weeks are in the database$/, function(next) {
    // Seems the <a> and </a> counts each as one, starting with index 1
	var client = this.mysql.createClient({
		user:     this.process_env.MYSQL_USER,
		database: this.process_env.MYSQL_DATABASE,
		password: this.process_env.MYSQL_PASSWORD,
		host:     this.process_env.MYSQL_HOST
	});

	var queryString = 'show tables where Tables_in_stats like "stats_%"';
	var browser = this.browser;

	client.query(queryString, function(err, rows, fields) {
		if (err) throw err;
                var count = 0;
		for (var i in rows) {
			count++;
		}

		var linkNum = 0;
		var iter = 3;
		while (true)
		{
			var link = browser.html('a:nth-child('+ iter +')');
			if (link != '') linkNum++;
			else break;
			iter += 2;
		}
		linkNum.should.equal(count);
		client.end();
		next();
	});
});

};

module.exports = getAllWeeksTestSteps;

