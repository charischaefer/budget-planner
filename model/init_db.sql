--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists entries;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  question TEXT,
  content TEXT,
  mood INT,
  created_at DATE
);

--
-- Add Foreign Key Constraint
--

ALTER TABLE entries
ADD CONSTRAINT entries_user_id_foreign
FOREIGN KEY (user_id) REFERENCES users(id);

--
-- Sample User Insertion
--

INSERT INTO users (username, email, password)
VALUES ('username', 'username@gmail.com', '1234');

INSERT INTO entries (user_id, question, content, mood, created_at)
VALUES (1,'What did you work on today?', 'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.', 3, '2023-08-29');