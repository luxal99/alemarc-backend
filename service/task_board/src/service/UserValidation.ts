import bcrypt = require("bcrypt");
import crypto = require("crypto");
import {Json} from "sequelize/types/lib/utils";


const algorithm = 'aes-256-gcm';
const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';

export class UserValidation extends Error {

    static validateUsername(username: string) {
        if (username.length < 6) {
            throw new Error("User error");
        }
    }

    static validatePassword(password: string) {
        if (password.length < 8) {
            throw new Error("Password error")
        }
    }

    static async checkPassword(inputPassword: string, hashedPassword: string) {
        if (!await bcrypt.compare(inputPassword, hashedPassword)) {
            throw new Error("Not match");
        } else {
            return true
        }
    }

    constructor(message: string) {
        super(message);
    }


    static encrypt(id){
       var key = crypto.createHmac('sha256',id).digest('hex');
       return key;
    }

    static decrypt(hmac){

    }



}