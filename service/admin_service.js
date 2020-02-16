const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alemarc_dev',
    multipleStatements: true
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
    console.log('App listening on port 3000!');
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