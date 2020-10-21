import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {App} from "./routes/app";
import express = require("express");

const app = express();
import {UserService} from "./service/UserService";
import bodyParser = require("body-parser");
import {Blog} from "./entity/Blog";
import {Image} from "./entity/Image";
import {Message} from "./entity/Message";
import {Technology} from "./entity/Technology";

app.use(bodyParser.json());


createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Luxal.99",
    "database": "alemarc",
    "synchronize": true,
    "logging": false,
    "entities": [
        Blog,
        Image,
        Message,
        Technology,
        User
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}).then(async connection => {
    console.log('Connected to database');
    const application = new App("user", "blog", "message", "image", "technology").app;
    application.listen(8080, () => {
        console.log("On port 8080");
    })
}).catch(error => console.log(error));



