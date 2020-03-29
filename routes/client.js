const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('../config/database');
const router = express.Router();

require('dotenv').config();

var app = express();

//Type of entity
var SiteOrder = require('../entity/entity');
var Client = require('../entity/entity');
var Mail = require('../entity/entity');

//Entity initialize
message = new Mail();
order = new SiteOrder();
client = new Client();
var idSavedClient;

app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));
app.use(bodyparser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//region -- Client --


//Client to forward for order
router.get('/saveClient', (request, response) => {
    app.use(cors())
    mysql.query('select * from client where id_client = (select max(id_client) from client); ', (err, rows) => {
        if (!err) {

            response.send(rows);
            idSavedClient = rows[0].id_client;
        } else {

            res.send(rows);

        }

    })
});


router.post('/saveClient', (req, res) => {
    client = req.body;
    app.use(cors());
    mysql.query('INSERT INTO client SET ?', client, function (error, results) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            client.id_client = idSavedClient;
            mysql.query('select * from client where id_client = (select max(id_client) from client);', (err, rows) => {
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


//Send Message to Admin
router.post('/sendMessage', (req, res) => {
    app.use(cors());
    message = req.body;
    mysql.query('insert into mail set ?', message, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.send('Uspesno poslata poruka');
        }
    })
});
//End

//Create order
router.post('/createOrder', (req, res) => {
    app.use(cors());
    order = req.body;
    mysql.query('insert into site_order set ?', order, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.send("Uspesno poslata narudzbina");
        }
    })
})
//End order


//Get payment option from db
router.get('/getPaymentOptions', (req, res) => {
    mysql.query('select * from payment_option', (error, rows) => {
        res.send(rows);
    })
})
//End


//Get maintenance package
router.get('/getMaintenacePacket', (req, res) => {
    mysql.query('select * from maintenance_packet', (error, rows) => {
        res.send(rows);
    })
});
// End

// Get type of website
router.get('/getWebsiteTypes', (req, res) => {
    mysql.query('select * from site_type where id_site_type =1', (err, rows) => {
        res.send(rows);
    })
});
// End

module.exports = router;
//endregion