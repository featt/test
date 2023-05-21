CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(50),
  registration_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_name VARCHAR(50) NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  order_date DATE NOT NULL
);

INSERT INTO users (name, age, email, registration_date) VALUES 
  ('John', 25, 'john@example.com', '2023-01-01'),
  ('Anna', 30, 'anna@example.com', '2023-02-15'),
  ('Mike', 35, 'mike@example.com', '2023-03-20');

INSERT INTO orders (user_id, product_name, quantity, order_date) VALUES 
  (1, 'Product A', 2, '2023-01-05'),
  (1, 'Product B', 1, '2023-02-20'),
  (3, 'Product A', 3, '2023-03-25');