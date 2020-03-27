const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
require('dotenv').config();


var Mail = require('../entity/entity');

app.use(bodyparser.json());
app.use(cors());
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))

//SQL CONNECTION
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: 'utf8mb4'

});

//GLOBAL VARIABLES
let isAuthenticated = false;
var token = null;


mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(process.env.CLIENT_PORT, () => {
    console.log('App listening on port 8000!');
});



    module.exports = app;

