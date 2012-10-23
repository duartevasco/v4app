
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , week_counter = require('./routes/week_counter')
  , get_weeks = require('./routes/get_weeks')
  , http = require('http')
  , path = require('path')
  , process_env = require('./environment').variables()
  , week_graph = require('./routes/week_graph')

var app = express();

app.configure(function(){
  app.set('port', process_env.PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/get/total/count/:year/:week', week_counter.week_count);
app.get('/get/all/weeks', get_weeks.get_all_weeks);
app.get('/graph/weeks', week_graph.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
