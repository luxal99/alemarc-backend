import {Body, Controller, Get, HttpStatus, Post, Put, Req, Res} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Blog} from "./blog.entity";
import {BlogService} from "./blog.service";
import {Response} from "express";

@Controller('blog')
export class BlogController extends GenericController<Blog> {
    constructor(private readonly service: BlogService) {
        super(service);
    }

    @Post('/popular')
    async getPopular(@Res() res: Response) {
        try {
            res.send(await this.service.mostPopular())
        } catch (e) {
            res.send(HttpStatus.BAD_GATEWAY)
        }
    }

    @Put('/view')
    async incrementView(@Body() entity: Blog, @Res() res: Response) {
        await this.service.incrementView(entity.id).then(() => {
            res.sendStatus(HttpStatus.OK)
        }).catch(() => {
            res.sendStatus(HttpStatus.BAD_GATEWAY);
        })
    }
}
