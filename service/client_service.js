const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');
var app = express();


var SiteOrder = require('../entity/entity');
var Client = require('../entity/entity');
var Mail = require('../entity/entity');


app.use(bodyparser.json());
var idSavedClient;

//------------------------------------------------------DATABASE CONNECTION-------------------------------------------------------------

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alemarc99',
    database: 'alemarc',
    multipleStatements: true,
    charset : 'utf8mb4'
});


mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

// app.listen(8080, () => {
//     console.log('App listening on port 3000!');
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(8080, () => {
    console.log('App listening on port 8080!');
});

//------------------------------------------------------DATABASE CONNECTION-------------------------------------------------------------

// module.exports.getNames = function getNames() {
//     app.get('/names', (req, res) => {
//
//         mysqlConnection.query('SELECT * FROM names', (err, rows) => {
//             if (!err) {
//                 console.log(rows[0].id_name);
//
//                 res.send(rows);
//             } else {
//                 console.log(err);
//             }
//
//         })
//
//
//     });
// }
//
//
// module.exports.sendMail = function sendMail(message, subject, toMail) {
//     app.post('/sendMail', (req, res) => {
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'd.lukic02@gmail.com',
//                 pass: 'kopaonik'
//             },
//             port: '465',
//             secure: true
//         });
//
//         var mailOptions = {
//             from: 'd.lukic02@gmail.com',
//             to: toMail,
//             subject: subject,
//             text: message
//         };
//
//         transporter.sendMail(mailOptions, function(error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//         res.send("Sent");
//     })
//
// }
//
//
//
//
//
// app.get('/findUser/:id_name', (req, res) => {
//     var id_name = req.params.id_name;
//     mysqlConnection.query('SELECT * FROM names where id_name = ? ', id_name, (err, rows) => {
//         if (!err) {
//             res.send(rows)
//         } else {
//             res.send(err);
//         }
//     })
// })


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
        mysqlConnection.query('insert into site_order set ?',order, function (error, result) {
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
    app.get('/client/getPaymentOptions',(req,res)=>{
        mysqlConnection.query('select * from payment_option',(error,rows)=>{
            if(error){
                res.send(error);
            }else{
                res.send(rows);
            }
        })
    })

}

module.exports.getMaintenacePacket = function getMaintenacePacket(){
    app.get('/client/getMaintenacePacket',(req,res)=>{
        mysqlConnection.query('select * from maintenance_packet',(error,rows)=>{
            if(error){
                res.send(error);
            }else {
                res.send(rows);
            }
        })
    })
}
module.exports.getWebsiteTypes = function getWebsiteTypes() {
    app.get('/client/getWebsiteTypes',(req,res)=>{
        mysqlConnection.query('select * from site_type',(err,rows)=>{
            if(err){
                res.send(err);
            }else{
                res.send(rows);
            }
        })
    })

}