const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
var nodemailer = require('nodemailer');

var Mail = require('../entity/entity');

app.use(bodyparser.json());
app.use(cors());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alemarc_dev',
    multipleStatements: true,
    charset : 'utf8mb4'

});



mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});



app.use(function(req, res, next) {
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

    app.get('/admin/getAllMessages',(req,res)=>{

        mysqlConnection.query('select * from mail join client c on mail.id_client = c.id_client;',(err,rows)=>{
            if(!err){
                res.send(rows)
            }else{
                res.send(err);
            }
        })
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
        mail  = req.body;
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

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send("Sent");
    })

}

module.exports.getAllOrders= function getAllOrders() {
    app.get('/admin/getAllOrders',(req,res)=>{
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
            '         join site_type st on site_order.id_site_type = st.id_site_type;',(err,rows)=>{
            if(err){
                res.send("Neuspesan zahtev");
            }else{
                res.send(rows);

            }
        })
    })



}

module.exports.deleteOrder = function deleteOrder() {
    app.delete('/admin/deleteOrder/:id_site_order',(req,res)=>{
        id_site_order=req.params.id_site_order;
        mysqlConnection.query('delete from site_order where id_site_order=?',id_site_order,(err,rows)=>{
            if(err){
                res.send('Neuspesno brisanje');
            }else{
                res.send(rows);
            }
        })

    })

}