const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var https = require('https');
require('dotenv').config();

var app = express();
var fs = require('fs');

var SiteOrder = require('../entity/entity');
var Client = require('../entity/entity');
var Mail = require('../entity/entity');


app.use(bodyparser.json());
var idSavedClient;

//------------------------------------------------------DATABASE CONNECTION-------------------------------------------------------------


const options={
    key:fs.readFileSync('/etc/letsencrypt/live/alemarc.dev/privkey.pem'),
    cert:fs.readFileSync('/etc/letsencrypt/live/alemarc.dev/fullchain.pem')
};
https.createServer(options,function (req,res) {
    res.sendStatus(200)
},app).listen(8443);
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

module.exports.getLastSaved = function getLastSaved() {
    app.get('/saveClient', (request, response) => {

        mysqlConnection.query('select * from client where id_client = (select max(id_client) from client); ', (err, rows) => {
            if (!err) {

                response.send(rows);
                idSavedClient = rows[0].id_client;
                console.log(idSavedClient);
            } else {

                res.send(rows);

            }

        })
    });
}

module.exports.saveClient = function saveClient(client) {

    client = new Client();
    app.post('/client/saveClient', (req, res) => {
        client = req.body;
        app.use(cors());
        mysqlConnection.query('INSERT INTO client SET ?', client, function (error, results) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                client.id_client = idSavedClient;
                mysqlConnection.query('select * from client where id_client = (select max(id_client) from client);', (err, rows) => {
                    app.use(cors());
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(rows);
                    }
                })
            }
        })

    });

}


module.exports.sendMessageToAdmin = function sendMessageToAdmin(message) {
    message = new Mail();
    app.post('/client/sendMessage', (req, res) => {
        app.use(cors());
        message = req.body;
        mysqlConnection.query('insert into mail set ?', message, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.send('Uspesno poslata poruka');
            }
        })
    });
}

module.exports.createOrder = function createOrder(order) {
    order = new SiteOrder();
    app.post('/client/createOrder', (req, res) => {
        app.use(cors());
        order = req.body;
        mysqlConnection.query('insert into site_order set ?', order, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.send("Uspesno poslata narudzbina");
            }
        })
    })
    app.use(cors());


}

module.exports.getPaymentOptions = function getPaymentOptions() {
    app.get('/client/getPaymentOptions', (req, res) => {
        mysqlConnection.query('select * from payment_option', (error, rows) => {
            if (error) {
                res.send(error);
            } else {
                res.send(rows);
            }
        })
    })

}

module.exports.getMaintenacePacket = function getMaintenacePacket() {
    app.get('/client/getMaintenacePacket', (req, res) => {
        mysqlConnection.query('select * from maintenance_packet', (error, rows) => {
            if (error) {
                res.send(error);
            } else {
                res.send(rows);
            }
        })
    })
}
module.exports.getWebsiteTypes = function getWebsiteTypes() {
    app.get('/client/getWebsiteTypes', (req, res) => {
        mysqlConnection.query('select * from site_type', (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.send(rows);
            }
        })
    })

}