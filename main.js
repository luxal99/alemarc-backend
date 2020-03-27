const express = require('express');
const app = express();
const service = require('./service/service');
service.listen(process.env.PORT,()=>{
    console.log('Service runned')
})