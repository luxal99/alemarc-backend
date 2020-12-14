import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";
import {AC_DENIED_MESSAGE, INVALID_TOKEN_MESSAGE, TOKEN_HEADER_NAME, TOKEN_SECRET} from "../constants/const";
import {Response, Request} from "express";

const jwt = require('jsonwebtoken');

@Injectable()
export class JWTMiddle implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.header(TOKEN_HEADER_NAME);

        if (!token) return res.status(401).send({message: AC_DENIED_MESSAGE});

        try {
            jwt.verify(token, TOKEN_SECRET)
            next();
        } catch (e) {
            res.status(400).send({message: INVALID_TOKEN_MESSAGE});
        }
    }
}
