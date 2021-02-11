import {Controller, Get, HttpStatus, Req, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Request, Response} from "express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("/jwt")
    async validateToken(@Req() req: Request, @Res() res: Response) {
        res.status(HttpStatus.ACCEPTED).send({
            message: 'Accepted',
            status: HttpStatus.ACCEPTED
        })
    }
}
