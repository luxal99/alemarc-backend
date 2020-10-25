import {Body, Controller, HttpStatus, Inject, Post, Req, Res} from '@nestjs/common';
import {User} from "./user.entity";
import {Response} from "express";
import {UserService} from "./user.service";
import bcrypt = require("bcrypt");

@Controller('user')
export class UserController {

    @Inject()
    private userService: UserService

    @Post('/auth')
    async auth(@Body() entity: User, @Res() res: Response) {
        try {

            const user = await this.userService.findByUsername(entity.username);
            const auth = ((user != null && await bcrypt.compare(entity.password, user.password))
                ? res.send(user.password) : res.sendStatus(403))

        } catch {
            res.sendStatus(HttpStatus.BAD_GATEWAY);
        }

    }

}
