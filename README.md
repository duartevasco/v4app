v4app
=====

v4app

To insert the database tables:
1- got to the directory where the .sql files are
2- remove export.sql
3- run (in bash): for i in $(ls | grep sql); do mysql stats < $i; done 
