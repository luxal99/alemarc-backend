const mysql = require('mysql');
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));

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

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology: true },
    ()=> console.log('Connected to Database'));

module.exports = mongoose;

module.exports = mysqlConnection;

