
var zombie = require('zombie'),
    html5 = require('html5'),
    should = require('should'),
    process_env = require('../../environment').variables(),
    mysql = require('mysql');

var World = function World(callback) {
  this.browser = new zombie.Browser({
	runScripts: true,
	debug: false,
	htmlParser: html5}); // this.browser will be available in step definitions

  this.visit = function(url, callback) {
    this.browser.visit(url, callback);
  };

  this.process_env = process_env;
  this.mysql = mysql;

  this.webhost = "http://" + process_env.WEBHOST + ":" + process_env.PORT;

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;
