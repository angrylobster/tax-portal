DROP DATABASE IF EXISTS taxdb;
CREATE DATABASE taxdb;
\c taxdb;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT,
    address TEXT,
    tax_registration TEXT,
    contact_number INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    submission JSON,
    user_id INTEGER,
    year INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO users (email, password, address, tax_registration, contact_number) VALUES ('email@email.com', 'password', 'address', 'T4XREG1STR4T1ON', 123456);
INSERT INTO submissions (submission, user_id, year) VALUES ('{"submission": "submission"}', 1, 2019);