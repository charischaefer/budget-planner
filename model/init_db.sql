--
-- Drop Tables
--
SET foreign_key_checks = 0;
DROP TABLE if exists categories;
DROP TABLE if exists transactions;
DROP TABLE if exists users;
SET foreign_key_checks = 1;
--
-- Create Tables
--
CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(255) NOT NULL
);
CREATE TABLE `transactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `amount` INT NOT NULL,
    `date` DATE NOT NULL,
    `source` CHAR(255) NOT NULL,
    `type` CHAR(255) NOT NULL,
    `category_id` INT NOT NULL,
    `user_id` INT NOT NULL
);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL,
    `firstname` CHAR(255) NOT NULL,
    `lastname` CHAR(255) NOT NULL,
    `email` CHAR(255) NOT NULL,
    `image` CHAR(255) NOT NULL
);