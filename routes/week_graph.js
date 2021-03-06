var process_env = require('../environment').variables();
var mysql = require('mysql');
var mysql_connector = require('../mysql_connector');

exports.week_count_array = function(req, res) {
    res.render('week_graph', {title: 'Graph of installations by week'});
};

exports.week_count_array_json = function(req, res) {
    
	var client = mysql_connector.connect_to_mysql()

    function UTCDate(input) {
        var week = input.substring(4, 6);
        var year = input.substring(0, 4);
        
        var j10 = new Date( year,0,10,12,0,0),
        j4 = new Date( year,0,4,12,0,0),
        mon1 = j4.getTime() - j10.getDay() * 86400000;
        var result = new Date(mon1 + ((week - 1)  * 7 ) * 86400000);
        return result.getTime();
    }
        
    function get_select_statements_for_each_table( rows ){
	var selectStatements = new Array()
	    for (var i in rows) {
            var date = rows[i].Tables_in_stats.substring(6, 12);
            selectStatements.push(' SELECT SUM(count) as count, "' + date + '" as date FROM ' + rows[i].Tables_in_stats +' WHERE os LIKE "%xp%" AND productver=1');
		}
	return selectStatements
	}


    var queryString = 'SHOW TABLES WHERE Tables_in_stats LIKE "stats_%";';
    var newQueryString = new Array();
    client.query(queryString, function(err, rows, fields) {
        if(err) {
            client.end();
            throw err;
        }
	selectStatements = get_select_statements_for_each_table( rows )
        newQueryString.push(selectStatements.join('\n UNION ALL\n'));
        newQueryString.push(' GROUP BY date;');

        var result = new Array();
        var sql = newQueryString.join('\n');
        client.query(sql, function(err, rows, fields) {
            if(err) {
                client.end();
                throw err;
            }
            for (var i in rows) {
                if(!rows[i].count){
                    continue;
                }
                result.push({
            		y: parseInt(rows[i].count ? rows[i].count : 0, 10),
			x: UTCDate(rows[i].date)
//                    name: 'xp range'
    			});
    		}
            res.send(result);
            client.end();
        });
    });
};
