var readLandingPageTestSteps = function () {
  this.World = require("../support/world.js").World; // overwrite default World constructor

  this.Given(/^I am on the V4 app landing webpage$/, function(callback) {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a new this.World instance.
    // i.e. you may use this.browser to execute the step:

    this.visit('http://localhost:3000', callback);

    // The callback is passed to visit() so that when the job's finished, the next step can
    // be executed by Cucumber.
  });

  this.Then(/^I should see "([^"]*)" as the "([^"]*)" link with ref to "([^"]*)"$/, function(link_text, order, href, next) {
    // Seems the <a> and </a> counts each as one, starting with index 1
    var item = parseInt(order) * 2 - 1 
    this.browser.html('a:nth-child('+ item +')').should.include(link_text)
    this.browser.html('a:nth-child('+ item +')[href$="'+ href +'"]').should.not.be.empty
    next();
});

};

module.exports = readLandingPageTestSteps;

