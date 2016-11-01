create schema burgers_db;
use burgers_db;
create table burgers(id int NOT NULL AUTO_INCREMENT,burger_name varchar(50),devoured boolean, day date,primary key(id));