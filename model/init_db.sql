CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(255) NOT NULL
);

CREATE TABLE `transaction`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `amount` INT NOT NULL,
    `date` DATE NOT NULL,
    `source` CHAR(255) NOT NULL,
    `type` CHAR(255) NOT NULL,
    `category_id` INT NOT NULL,
    `user_id` CHAR(255) NOT NULL
);

CREATE TABLE `user`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL,
    `firstname` CHAR(255) NOT NULL,
    `lastname` CHAR(255) NOT NULL,
    `image` CHAR(255) NOT NULL
);