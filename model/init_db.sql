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

--
-- Sample Data
--

INSERT INTO `categories` (`name`)
VALUES
    ('Home'),
    ('Transportation'),
    ('Food & Drink'),
    ('Utilities'),
    ('Insurance'),
    ('Medical'),
    ('Savings/Investing/Debt'),
    ('Personal Spending'),
    ('Recreation & Entertainment'),
    ('Travel'),
    ('Childcare'),    
    ('Personal Care'),
    ('Pets'),
    ('Miscellaneous');

INSERT INTO `transactions` (`amount`, `date`, `source`, `type`, `category_id`, `user_id`)
VALUES
    (50, '2023-10-15', 'Grocery Store', 'Expense', 3, 1),
    (100, '2023-10-16', 'Electricity Bill', 'Expense', 4, 1),
    (30, '2023-10-17', 'Movie Tickets', 'Expense', 9, 1),
    (40, '2023-10-15', 'Gas Station', 'Expense', 2, 1),
    (25, '2023-10-16', 'Pharmacy', 'Expense', 6, 1),
    (75, '2023-10-17', 'Restaurant', 'Expense', 3, 2),
    (120, '2023-10-15', 'Internet Bill', 'Expense', 4, 2),
    (50, '2023-10-16', 'Public Transport', 'Expense', 2, 2),
    (20, '2023-10-17', 'Health Clinic', 'Expense', 6, 2),
    (60, '2023-10-15', 'Grocery Store', 'Expense', 3, 3),
    (90, '2023-10-16', 'Gas Station', 'Expense', 2, 3),
    (35, '2023-10-17', 'Movie Tickets', 'Expense', 9, 3),
    (1800, '2023-09-30', 'Salary', 'Income', 0, 1);

INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `email`, `image`)
VALUES
    ('user1', 'password1', 'Sheldon', 'Cooper', 'sheldon.cooper@email.com', 'user1.jpg'),
    ('user2', 'password2', 'Hermione', 'Granger', 'hermione.granger@email.com', 'user2.jpg'),
    ('user3', 'password3', 'Bill', 'Gates', 'bill.gates@email.com', 'user3.jpg');