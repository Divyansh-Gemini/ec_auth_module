-- To create database
CREATE DATABASE ec_auth;

-- to show name of all databases
SHOW DATABASES;

-- To use database
USE ec_auth;

-- Creating user table
CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    f_name VARCHAR(20) NOT NULL,
    l_name VARCHAR(20),
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    address VARCHAR(40) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    login_status BOOL NOT NULL DEFAULT false
);

-- adding seed data into user table
INSERT INTO user (f_name, l_name, username, email, password, address, city, state, mobile)
VALUES  ('Divyansh', 'Gemini', 'divyansh_gemini', 'divyanshgemini@gmail.com', 'div@1234', 'C-264, New Panchwati', 'Ghaziabad', 'UP', '9319220857'),
        ('Alpesh', 'Patel', 'alpesh_patel', 'alpeshpatel@gmail', 'alp@1234', '302, Sheel-3, Aptsankul, Simandhar City', 'Adalaj', 'Gujarat', '9876543210');

-- creating seller table
CREATE TABLE seller (
    seller_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    name VARCHAR(30) NOT NULL,
    category VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    pickup_address VARCHAR(40) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    gstin VARCHAR(15) NOT NULL,
    login_status BOOL NOT NULL DEFAULT false
);

-- adding seed data into seller table
INSERT INTO seller (name, category, username, email, password, pickup_address, city, state, phone, gstin)
VALUES  ('Amba Foods', 'Food', 'amba_foods', 'info@ambafoods.com', 'amba@1234', 'Amba Foods, Simandhar City', 'Adalaj', 'Gujarat', '9999999901', '24AFIPJ2367N2Z4'),
        ('Suhana Masala', 'Food', 'suhana_masala', 'info@suhanamasala.com', 'suhana@1234', '55, Hadapsar Industrial Estate', 'Pune', 'Maharashtra', '9999999902', '27AABFP7385E1Z2');
