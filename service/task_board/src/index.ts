import "reflect-metadata";
import express = require("express");
const app = express();
import {createConnection} from "typeorm";
import bodyParser = require("body-parser");
import {App} from "./routes/board";
app.use(bodyParser.json());



createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    console.log('Connected to database')


}).catch(error => console.log(error));


const secApp = new App().app;
secApp.listen(8000,()=>{
    console.log('Service run')
});
