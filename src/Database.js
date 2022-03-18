'use strict';

var mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
})

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    }
    else {
        console.log("connected to Database");
    }
});

module.exports = connection;