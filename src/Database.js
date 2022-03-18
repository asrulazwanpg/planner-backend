'use strict';

var mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
})

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
    }
});

module.exports = connection;