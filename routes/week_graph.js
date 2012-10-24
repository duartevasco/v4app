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

    function firstDayOfWeek(input) {
        
        var week = input.substring(4, 6)
        var year = input.substring(0, 4)
        
        if (typeof year !== 'undefined') {
            year = (new Date()).getFullYear();
        }

        var date       = firstWeekOfYear(year),
            weekTime   = weeksToMilliseconds(week),
            targetTime = date.getTime() + weekTime;
        
        return date.setTime(targetTime); 
    }

    function weeksToMilliseconds(weeks) {
        return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
    }
    
    function firstWeekOfYear(year) {
        var date = new Date();
        date = firstDayOfYear(date,year);
        date = firstWeekday(date);
        return date;
    }
    
    function firstDayOfYear(date, year) {
        date.setYear(year);
        date.setDate(1);
        date.setMonth(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
    
    function firstWeekday(date) {
        
        var day = date.getDay(),
            day = (day === 0) ? 7 : day;
            
        if (day > 3) {
    
            var remaining = 8 - day,
                target    = remaining + 1;
                    
            date.setDate(target);
        }
        
        return date;
    }
    
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
        client.query(sql, function(err, rows, fields) {
            if(err) {
                throw err;
                client.end();
            }
            for (var i in rows) {
                result.push({
            		y: rows[i].count ? rows[i].count : 0,
                    x: firstDayOfWeek(rows[i].date),
                    name: 'xp range',
                    color: 'black'
    			});
    		}
            res.send(JSON.stringify(result));
            client.end();
        });
    });
};
