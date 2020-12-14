import {Body, Controller, HttpStatus, Inject, Post, Req, Res} from '@nestjs/common';
import {User} from "./user.entity";
import {Response} from "express";
import {UserService} from "./user.service";
import bcrypt = require("bcrypt");
import {TOKEN_SECRET} from "../constants/const";

const jwt = require('jsonwebtoken')

@Controller('user')
export class UserController {

    @Inject()
    private userService: UserService

    @Post('/auth')
    async auth(@Body() entity: User, @Res() res: Response) {
        try {

            const user = await this.userService.findByUsername(entity.username);

            if (!user) {
                res.sendStatus(HttpStatus.NO_CONTENT)
            } else if (await bcrypt.compare(entity.password, user.password)) {
                const token = jwt.sign({user: user.username}, TOKEN_SECRET,{expiresIn:60*30})
                res.send({token:token})
            }else {
                res.sendStatus(HttpStatus.UNAUTHORIZED)
            }

        } catch {
            res.sendStatus(HttpStatus.BAD_GATEWAY);
        }

    }

}
