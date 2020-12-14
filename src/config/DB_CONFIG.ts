import {DB_NAME, DB_PASSWORD, DB_USERNAME, LIST_OF_ENTITIES} from "../constants/const";

export class DbConfig {
    config = {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": DB_NAME,
        "password": DB_USERNAME,
        "database": DB_PASSWORD,
        "synchronize": true,
        "logging": false,
        "entities": LIST_OF_ENTITIES,
    }
}
