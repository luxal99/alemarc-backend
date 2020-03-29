const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const SMTPServer = require("smtp-server").SMTPServer;
var nodemailer = require('nodemailer');
var fs = require('fs');
const axios = require('axios');
const router = express.Router();
var jwt = require('jsonwebtoken');

require('dotenv').config();

var app = express();

//region -- Admin --

/*
Funkcija u prvom koraku provera da li user ima token
Nakon toga proverava da li token koji ima user jeste validan
Ukoliko jeste stupa na snagu funkcija next() i izvrsava se SQL naredba
*/

app.get('/admin/getAllMessages/:token', (req, res, next) => {

    token = req.params.token;

    if (req.params.token === '') {
        res.sendStatus(401);
    } else next()
}, function (req, res, next) {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
        } else {
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
app.delete('/deleteMessage/:id_mail', (req, res) => {
    var id_mail = req.params.id_mail;
    mysqlConnection.query('delete from mail where id_mail = ?', id_mail, (error, rows) => {
            if (error) {
                res.send(error);
            } else {
                res.send('Uspesno obrisana');
            }
        }
    )
})
//End

//Send mail to client
app.post('/sendMail', (req, res) => {
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
router.get('/getAllOrders', (req, res) => {


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
app.delete('/deleteOrder/:id_site_order', (req, res) => {
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
app.post('/getPassword', (req, res) => {
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
app.post('/createUser', async (req, res) => {
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


app.put('/changeLogin', async (req, res) => {


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
app.post('/logout', (req, res) => {
    isAuthenticated = req.body.isAuthenticated;
    res.send('Logout');
})
//

module.exports = router
//endregion