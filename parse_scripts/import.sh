

MYSQL_USER=log_stats
MYSQL_PASS=********
MYSQL_BASE=stats

MYSQL="mysql -u$MYSQL_USER -p$MYSQL_PASS $MYSQL_BASE -NBe"

TABLES=`$MYSQL "show tables"`

#find /u/logfiles/daily/month -name '[0-9]{6}

#exit 0
for i in ??????.txt;do
	WEEK=`echo $i | cut -c1-6`
	TABLE=stats_$WEEK
	FOUND=0
	SQLUPD="TRUNCATE TABLE os_parsed;INSERT INTO os_parsed(os) (SELECT DISTINCT os_parsed FROM ${TABLE})"
	for t in $TABLES ; do 
		if expr "${t}" : '^stats_[0-9][0-9][0-9][0-9][0-9][0-9]$' > /dev/null ; then 
			SQLUPD="${SQLUPD} UNION DISTINCT (SELECT DISTINCT os_parsed FROM ${t})"
		fi

		if [ "${t}" = "${TABLE}" ] ; then
			FOUND=1
		fi
	done
	SQLUPD="${SQLUPD};"
	if [ $FOUND = 0 ] ; then
		echo "Creating $TABLE"
		SQL="
CREATE TABLE $TABLE
(
	count INTEGER,
	license varchar(200),
	product varchar(200),
	os varchar(200),
	osver varchar(200),
	os_parsed varchar(64),
	productver INTEGER,
	toolbar INTEGER,
	qualified INTEGER,
	country varchar(2),
	continent varchar(2)
);"
		T=`tempfile`
		/root/bin/add_os < $i > $T
		$MYSQL "$SQL"
		$MYSQL "LOAD DATA LOCAL INFILE '$T' INTO TABLE $TABLE;"
		$MYSQL "$SQLUPD"	
		rm $T
	else
		echo "$TABLE already created"
	fi
	#mysql -p`cat ~/mysql-root.txt ` log_stats -e "LOAD DATA LOCAL INFILE '201136-month.txt.tmp' INTO TABLE stats_201136;"
	
done
