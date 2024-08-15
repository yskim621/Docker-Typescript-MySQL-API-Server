DROP DATABASE IF EXISTS example_db;
CREATE DATABASE example_db;
USE example_db;
DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS users;

CREATE TABLE auth(
     idx INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
     id varchar(50),
     token varchar(255),
     last_status varchar(10),
     PRIMARY KEY (idx)
);

CREATE TABLE users(
      idx INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
      id varchar(50),
      pw varchar(50),
      phone varchar(11),
      PRIMARY KEY (idx)
);
