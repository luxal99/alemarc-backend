import "reflect-metadata";
import express = require("express");
const app = express();
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {TaskBoard} from "./entity/TaskBoard";
import {TaskCard} from "./entity/TaskCard";

const boardRoute = require("./routes/board");
app.use('/board',boardRoute);



createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    //
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    //
    // console.log("Here you can setup and run express/koa/any other framework.");
    console.log('Database 100%')


}).catch(error => console.log(error));


 app.listen(8000,()=>{

 });


