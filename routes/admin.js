const mysql = require('../config/database');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const SMTPServer = require("smtp-server").SMTPServer;
const nodemailer = require('nodemailer');
const fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');

var dateFormat = require('dateformat');
var now = new Date();
var TaskBoard = require('../model/TaskBoad');
var TaskCard = require('../model/TaskCard')

dateFormat(now, "dd-mm-yyyy");

require('dotenv').config();
app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));
app.use(bodyparser.json());
app.use(cors());
app.use(router)
app.use(fileUpload());

var SiteOrder = require('../entity/entity');
var Client = require('../entity/entity');
var Mail = require('../entity/entity');
const Blog = require('../model/Blog');


app.get('/', (req, res) => {
    res.render('index.ejs');

});

//region -- Admin --

//region -- Messages/Mail --

/*
Funkcija u prvom koraku provera da li user ima token
Nakon toga proverava da li token koji ima user jeste validan
Ukoliko jeste stupa na snagu funkcija next() i izvrsava se SQL naredba
*/

router.get('/getAllMessages/:token', (req, res, next) => {

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

    mysql.query('select * from mail join client c on mail.id_client = c.id_client;', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }
    })
});

//Delete message
router.delete('/deleteMessage/:id_mail', (req, res) => {
    var id_mail = req.params.id_mail;
    mysql.query('delete from mail where id_mail = ?', id_mail, (error, rows) => {
            if (error) {
                res.send(error);
            } else {
                res.send('Uspesno obrisana');
            }
        }
    )
});
//End

//Send mail to client
router.post('/sendMail', (req, res) => {
    mail = new Mail();
    mail = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
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
});
//End

//endregion

//region -- Order --

//Return all orders
router.get('/getAllOrders', (req, res) => {


    mysql.query('select id_site_order,c.name,\n' +
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


});
//end


//Forward ID order and delete
router.delete('/deleteOrder/:id_site_order', (req, res) => {
    id_site_order = req.params.id_site_order;
    mysql.query('delete from site_order where id_site_order=?', id_site_order, (err, rows) => {
        if (err) {
            res.send('Neuspesno brisanje');
        } else {
            res.send(rows);
        }
    })

});
//End


//endregion

//region -- User --

/*
    Funkcija se koristi prilikom pristupa admin panelu.
     Sifre u bazi su enkriptovane.Tako da se poziva biblioteka
     bcrypt kako bi ih dekriptovala i uporedila i sa onim sto dolazi
     sa frontenda
 */
router.post('/getPassword', (req, res) => {
    mysql.query('select * from admin where username = ?', req.body.username, async (err, rows) => {
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
});

//Create admin
router.post('/createUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var user = {username: req.body.username, password: hashedPassword}
    mysql.query('insert into admin set ?', user, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send('User registered');
        }
    })
});
//End


router.put('/changeLogin', async (req, res) => {


    try {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        mysql.query('update admin set username = ?,password=? where id_admin = ?', [req.body.username, hashedPassword, req.body.id_admin], (err, rows) => {
            try {
                res.send(true);
            } catch {
                res.send('Neuspseno ponavljanje lozinke');
            }
        })
    } catch {
        res.send("Old password invalid")
    }


});


//Logout
router.post('/logout', (req, res) => {
    isAuthenticated = req.body.isAuthenticated;
    res.send('Logout');
});
//


//endregion
//Upload photo

//region -- Blog --

router.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image_url;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`../alemarc-frontend/src/assets/img/blog/${sampleFile.name}`, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(sampleFile.name);
    });
});

router.post('/saveBlog', (req, res) => {
    console.log(req.body)
    try {
        var blog = new Blog({
            header: req.body.header,
            text_en: req.body.text_en,
            text_sr: req.body.text_sr,
            author: 'Alemarc',
            date: now,
            images: req.body.images,
            cover: req.body.cover,
            technologies: req.body.technologies
        })

        blog.save().then(
            res.send("Saved")
        )
    } catch {

    }

})
//End

router.get('/getOneBlog/:_id', async (req, res) => {
    try {
        const blog = await Blog.findOne({_id: req.params._id});
        res.send(blog)
    } catch {
        res.send("Can not find")
    }
})
router.delete("/deleteBlog/:_id", async (req, res) => {
    try {
        const removedOrder = await Blog.deleteOne({_id: req.params._id});
        res.sendStatus(200);
    } catch {

    }
})

router.get('/getBlogs', async (req, res) => {
    try {
        blog = await Blog.find();
        res.send(blog);
    } catch {

    }
})

router.post('/board/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image_url;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`../alemarc-frontend/src/assets/img/task/${sampleFile.name}`, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(sampleFile.name);
    });
});



//endregion

module.exports = router;
module.exports = app;

//endregion