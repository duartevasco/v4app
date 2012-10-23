v4app
=====

v4app

To insert the database tables:
1- got to the directory where the .sql files are

2- remove export.sql

3- run (in bash): for i in $(ls | grep sql); do mysql stats < $i; done 


To prepare for running in node.js:

1- in your terminal, export NODE_ENV=development  (or any other environment you like)

(not needed)
2- if needed, export MYSQL_HOST='username' for database user. If not specified, the system user is used

(not needed)
3- if needed, export MYSQL_PASSWORD='secret' for database password of, otherwise empty pwd is used

4- export PORT=port_number to specify the web server port, otherwise 3000 is used

5- run node app and enjoy

6- mysql -uroot

7- grant all on stats.* to '<user.name>'@'localhost';

