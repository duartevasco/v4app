
var zombie = require('zombie'),
    html5 = require('html5'),
    should = require('should');

var World = function World(callback) {
  this.browser = new zombie.Browser({
	runScripts: true,
	debug: false,
	htmlParser: html5}
); // this.browser will be available in step definitions

  this.visit = function(url, callback) {
    this.browser.visit(url, callback);
  };

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;
