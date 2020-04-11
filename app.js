const express = require('express');
const app = express();
const database = require('./config/database');

const bodyparser = require('body-parser');
const adminRoute = require('./routes/admin');
const clientRoute = require('./routes/client');
const controller = require('./controller/controller');

app.use('/board',controller);
app.use(bodyparser.json());
app.use('/admin',adminRoute);
app.use('/client',clientRoute);

app.listen(process.env.PORT,()=>{
    console.log('Service runned')
});


