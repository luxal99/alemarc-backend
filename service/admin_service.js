const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var Mail = require('../entity/entity');

app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luxal.99',
    database: 'alemarc',
    multipleStatements: true,
    charset: 'utf8mb4'

});

let isAuthenticated = false;


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

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

module.exports.getAllMessages = function getAllMessages() {

    app.get('/admin/getAllMessages', (req, res) => {
        if (isAuthenticated===false){
            res.redirect('/')
        }else{
            mysqlConnection.query('select * from mail join client c on mail.id_client = c.id_client;', (err, rows) => {
                if (!err) {
                    res.send(rows);

                } else {
                    res.send(err);
                }
            })
        }

    })
}
module.exports.deleteMessage = function deleteMessage(id_mail) {

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
}


module.exports.sendMail = function sendMail(mail) {


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

}

app.get('/',(req,res)=>{
    res.render('index.ejs');

})


module.exports.getAllOrders = function getAllOrders() {
    app.get('/admin/getAllOrders'  ,(req, res) => {

      if (isAuthenticated === false){
          res.redirect('/')
      }else{
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
      }
    })


}

module.exports.deleteOrder = function deleteOrder() {
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

}

module.exports.getAdminPasswrod = function getAdminPasswrod() {
    app.post('/admin/getPassword', (req, res) => {
        mysqlConnection.query('select * from admin where username = ?', req.body.username, async (err, rows) => {

            try {
                if (await bcrypt.compare(req.body.password, rows[0].password)) {
                    var idUser = rows[0].id_admin;
                    isAuthenticated = true;
                    res.send({idUser, redirect: "/admin"});

                } else {
                    res.send({message: "Password invalid", redirect: "/login"})
                }
            } catch {
                res.send({message: "Username not found", redirect: "/login"});
            }

        })
    })
}

module.exports.createUser = function createUser() {

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

}

module.exports.changeLogin = function changeLogin() {
    app.put('/admin/changeLogin', async (req, res) => {


        try {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

            mysqlConnection.query('update admin set username = ?,password=? where id_admin = ?',[req.body.username,hashedPassword,req.body.id_admin], (err, rows) => {
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

}

module.exports.logout = function logout() {
    app.post('/admin/logout',(req,res)=>{
        isAuthenticated = req.body.isAuthenticated;
        res.send('Logout');
    })
}

