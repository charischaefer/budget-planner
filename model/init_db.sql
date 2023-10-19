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
    `user_id` CHAR(255) NOT NULL
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

--
-- Sample Data
--

INSERT INTO `categories` (`name`)
VALUES
    ('Housing'),
    ('Transportation'),
    ('Entertainment'),
    ('Food & Dining'),
    ('Education'),
    ('Travel'),
    ('Shopping'),
    ('Savings'),
    ('Health & Fitness'),
    ('Gifts & Donations'),
    ('Utilities'),
    ('Taxes'),
    ('Insurance'),
    ('Debt Repayment'),
    ('Personal Care'),
    ('Salary'),
    ('Freelance'),
    ('Business'),
    ('Investments'),
    ('Rental Income'),
    ('Interest');

INSERT INTO `transactions` (`amount`, `date`, `source`, `type`, `category_id`, `user_id`)
VALUES
    (50, '2023-10-15', 'Grocery Store', 'Expense', 1, 1),
    (100, '2023-10-16', 'Electricity Bill', 'Expense', 2, 1),
    (30, '2023-10-17', 'Movie Tickets', 'Expense', 3, 1),
    (40, '2023-10-15', 'Gas Station', 'Expense', 4, 1),
    (25, '2023-10-16', 'Pharmacy', 'Expense', 5, 1),
    (75, '2023-10-17', 'Restaurant', 'Expense', 3, 2),
    (120, '2023-10-15', 'Internet Bill', 'Expense', 2, 2),
    (50, '2023-10-16', 'Public Transport', 'Expense', 4, 2),
    (20, '2023-10-17', 'Health Clinic', 'Expense', 5, 2),
    (60, '2023-10-15', 'Grocery Store', 'Expense', 1, 3),
    (90, '2023-10-16', 'Gas Station', 'Expense', 4, 3),
    (35, '2023-10-17', 'Movie Tickets', 'Expense', 3, 3);

INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `email`, `image`)
VALUES
    ('user1', 'password1', 'Sheldon', 'Cooper', 'sheldon.cooper@email.com', 'user1.jpg'),
    ('user2', 'password2', 'Jane', 'Smith', 'jane.smith@email.com', 'user2.jpg'),
    ('user3', 'password3', 'Robert', 'Johnson', 'robert.johnson@email.com', 'user3.jpg');