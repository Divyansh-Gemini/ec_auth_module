import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// printing environment variables
console.log(`HOST: ${process.env.MYSQL_HOST}`);
console.log(`USER: ${process.env.MYSQL_USER}`);
console.log(`PASSWORD: ${process.env.MYSQL_PASSWORD}`);
console.log(`DATABASE: ${process.env.MYSQL_DATABASE}`);

// Creating pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// create new record in user table
export async function createUser(f_name, l_name, username, email, password, address, city, state, mobile) {
    console.log("\nsrc / database / database.js createUser() called");
    const [result] = await pool.query('INSERT INTO user (f_name, l_name, username, email, password, address, city, state, mobile) VALUES (?,?,?,?,?,?,?,?,?)',
        [f_name, l_name, username, email, password, address, city, state, mobile]);
    return result.insertId;
}

// get a record from user table using its Email
export async function getUserWithEmail(email) {
    console.log("\nsrc / database / database.js getUserWithEmail() called");
    const [row] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (row[0] == undefined) {
        console.log(`--> No existing user with email ${email}`);
    }
    return row[0];
}

// create new record in seller table
export async function createSeller(name, category, username, email, password, pickup_address, city, state, phone, gstin) {
    console.log("\nsrc / database / database.js createSeller() called");
    const [result] = await pool.query('INSERT INTO seller (name, category, username, email, password, pickup_address, city, state, phone, gstin) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [name, category, username, email, password, pickup_address, city, state, phone, gstin]);
    return result.insertId;
}

// get a record from seller table using its Email
export async function getSellerWithEmail(email) {
    console.log("\nsrc / database / database.js getSellerWithEmail() called");
    const [row] = await pool.query('SELECT * FROM seller WHERE email = ?', [email]);
    if (row[0] == undefined) {
        console.log(`No existing seller with email ${email}`);
    }
    return row[0];
}