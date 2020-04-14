import bcrypt = require("bcrypt");


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


}