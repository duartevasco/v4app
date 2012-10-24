var process_env = require('../environment').variables();
var mysql = require('mysql');

exports.week_count_array = function(req, res) {
    res.render('week_graph', {title: 'List all tables'});
};

exports.week_count_array_json = function(req, res) {
    
	var client = mysql.createClient({
		user:     process_env.MYSQL_USER,
		database: process_env.MYSQL_DATABASE,
		password: process_env.MYSQL_PASSWORD,
		host:     process_env.MYSQL_HOST
	});

    var queryString = 'SHOW TABLES WHERE Tables_in_stats LIKE "stats_%";';
    var newQueryString = new Array();
    client.query(queryString, function(err, rows, fields) {
        if(err) {
            throw err;
            client.end();
        }
        var selectStatements = new Array()
    	for (var i in rows) {
            var date = rows[i].Tables_in_stats.substring(6, 12);
            selectStatements.push(' SELECT SUM(count) as count, "' + date + '" as date FROM ' + rows[i].Tables_in_stats +' WHERE os LIKE "%xp%" AND productver=1');
		}
        newQueryString.push(selectStatements.join('\n UNION ALL\n'))
        newQueryString.push(' GROUP BY date;');

        var result = new Array();
        var sql = newQueryString.join('\n')
        console.log(sql)
        client.query(sql, function(err, rows, fields) {
            if(err) {
                throw err;
                client.end();
            }
            for (var i in rows) {
                result.push({
            		count: rows[i].count ? rows[i].count : 0,
                    date: rows[i].date
    			});
    		}
            res.send(result);
            client.end();
        });
    });
};
