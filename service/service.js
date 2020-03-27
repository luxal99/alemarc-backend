const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
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

app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}))
app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Now using https..');
});

//------------------------------------------------------DATABASE CONNECTION-------------------------------------------------------------
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: 'utf8mb4'
});
//------------------------------------------------------DATABASE CONNECTION-------------------------------------------------------------


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

//region -- Client --

//Client to forward for order
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


//Send Message to Admin
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
//End

//Create order
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
//End order


//Get payment option from db
app.get('/client/getPaymentOptions', (req, res) => {
    mysqlConnection.query('select * from payment_option', (error, rows) => {
        res.send(rows);
    })
})
//End


//Get maintenance package
app.get('/client/getMaintenacePacket', (req, res) => {
    mysqlConnection.query('select * from maintenance_packet', (error, rows) => {
        res.send(rows);
    })
});
// End

// Get type of website
app.get('/client/getWebsiteTypes', (req, res) => {
    mysqlConnection.query('select * from site_type', (err, rows) => {
        res.send(rows)
    })
});
// End

//endregion

//region -- Admin --

/*
Funkcija u prvom koraku provera da li user ima token
Nakon toga proverava da li token koji ima user jeste validan
Ukoliko jeste stupa na snagu funkcija next() i izvrsava se SQL naredba
*/

app.get('/admin/getAllMessages/:token', (req, res, next) => {

    token = req.params.token;
    console.log(token)

    if (req.params.token === '') {
        res.sendStatus(401);
    } else next()
}, function (req, res, next) {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
        } else {
            console.log(user)
            next();
        }
    })
}, function (req, res) {

    mysqlConnection.query('select * from mail join client c on mail.id_client = c.id_client;', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }
    })
})

//Delete message
app.delete('/admin/deleteMessage/:id_mail', (req, res) => {
    id_mail = req.params.id_mail;
    mysqlConnection.query('delete from mail where id_mail = ?', id_mail, (error, rows) => {
            if (error) {
                res.send(error);
            } else {
                res.send('Uspesno obrisans');
            }
        }
    )
})
//End

//Send mail to client
app.post('/admin/sendMail', (req, res) => {
    mail = new Mail();
    mail = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lukicaleksa04@gmail.com',
            pass: '*145#7890='
        },
        port: '465',
        secure: true
    });
    var mailOptions = {
        from: 'lukicaleksa04@gmail.com',
        to: [mail.toMail],
        subject: mail.subject,
        text: mail.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("Sent");
})
//End


app.get('/', (req, res) => {
    res.render('index.ejs');

})


//Return all orders
app.get('/admin/getAllOrders', (req, res) => {


    mysqlConnection.query('select id_site_order,c.name,\n' +
        '       c.lastname,\n' +
        '       c.mail,\n' +
        '       c.telephone,\n' +
        '       mp.title,\n' +
        '       mp.price,\n' +
        '       po.title,\n' +
        '       foreign_language,\n' +
        '       site_link,\n' +
        '       photography,\n' +
        '       mail_sender,\n' +
        '       domain,\n' +
        '       hosting,\n' +
        '       animation,\n' +
        '       number_of_pages,\n' +
        '       contact_form,\n' +
        '       comment\n' +
        'from site_order\n' +
        '         join client c on site_order.id_client = c.id_client\n' +
        '         join maintenance_packet mp on site_order.id_maintenance_packet = mp.id_maintenance_packet\n' +
        '         join payment_option po on site_order.id_payment_option = po.id_payment_option\n' +
        '         join site_type st on site_order.id_site_type = st.id_site_type;', (err, rows) => {
        if (err) {
            res.send("Neuspesan zahtev");
        } else {
            res.send(rows);

        }
    })


})
//end


//Forward ID order and delete
app.delete('/admin/deleteOrder/:id_site_order', (req, res) => {
    id_site_order = req.params.id_site_order;
    mysqlConnection.query('delete from site_order where id_site_order=?', id_site_order, (err, rows) => {
        if (err) {
            res.send('Neuspesno brisanje');
        } else {
            res.send(rows);
        }
    })

})
//End

/*
    Funkcija se koristi prilikom pristupa admin panelu.
     Sifre u bazi su enkriptovane.Tako da se poziva biblioteka
     bcrypt kako bi ih dekriptovala i uporedila i sa onim sto dolazi
     sa frontenda
 */
app.post('/admin/getPassword', (req, res) => {
    mysqlConnection.query('select * from admin where username = ?', req.body.username, async (err, rows) => {
        try {
            if (await bcrypt.compare(req.body.password, rows[0].password)) {
                var idUser = rows[0].id_admin;
                const accessToken = jwt.sign(idUser, process.env.ACCESS_TOKEN_SECRET);
                res.send({idUser, redirect: "/admin", token: accessToken});
            } else {
                res.send({message: "Password invalid", redirect: "/login"})
            }
        } catch {
            res.send({message: "Username not found", redirect: "/login"});
        }
    })
})


//Create admin
app.post('/admin/createUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var user = {username: req.body.username, password: hashedPassword}
    mysqlConnection.query('insert into admin set ?', user, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send('User registered');
        }
    })
})
//End


app.put('/admin/changeLogin', async (req, res) => {


    try {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        mysqlConnection.query('update admin set username = ?,password=? where id_admin = ?', [req.body.username, hashedPassword, req.body.id_admin], (err, rows) => {
            try {
                res.send(true);
            } catch {
                res.send('Neuspseno ponavljanje lozinke');
            }
        })
    } catch {
        res.send("Old password invalid")
    }


})


//Logout
app.post('/admin/logout', (req, res) => {
    isAuthenticated = req.body.isAuthenticated;
    res.send('Logout');
})
//

//endregion


module.exports = app;
