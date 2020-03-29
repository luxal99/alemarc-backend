const express = require('express');
const database = require('./config/database')
const app = express();
const adminRoute = require('./routes/admin');
const clientRoute = require('./service/service');
app.use('/admin',adminRoute);
app.use('/client',clientRoute);
app.listen(process.env.PORT,()=>{
    console.log('Service runned')
});


