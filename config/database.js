const mysql = require('mysql');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}))

var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: 'utf8mb4'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;

