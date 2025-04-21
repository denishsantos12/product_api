INSERT INTO users (username, password, roles)
SELECT 'user', 'user', 'USER'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user');

INSERT INTO users (username, password, roles)
SELECT 'admin', 'admin', 'USER,ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

INSERT INTO product (name, description, price, stock_quantity)
SELECT 'Laptop', 'High-performance laptop', 1299.99, 50
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Laptop');

INSERT INTO product (name, description, price, stock_quantity)
SELECT 'Smartphone', 'Latest model smartphone', 799.99, 100
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Smartphone');

INSERT INTO product (name, description, price, stock_quantity)
SELECT 'Headphones', 'Wireless noise-canceling headphones', 199.99, 75
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Headphones');