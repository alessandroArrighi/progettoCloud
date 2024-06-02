CREATE DATABASE IF NOT EXISTS `Auth`;
USE `Auth`;

CREATE TABLE IF NOT EXISTS Utenze (
    IDUtente        int         AUTO_INCREMENT PRIMARY KEY,
    User            varchar(100),
    Password        varchar(512) NOT NULL,
    Role            ENUM("admin", "user") default "user");

CREATE USER 'Arrighi'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON Auth.* TO 'Arrighi'@'%';