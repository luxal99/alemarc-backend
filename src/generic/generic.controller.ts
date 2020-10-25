import {GenericService} from "./generic.service";
import {Body, Get, HttpStatus, Param, Post, Req, Res} from "@nestjs/common";
import {Response, Request} from "express";
import * as redis from "redis";

export class GenericController<T> {

    constructor(private readonly genericService: GenericService<T>) {
    }

    redisClient = redis.createClient(6379,"127.0.0.1");
    set = (key, value) => {
        this.redisClient.set(key, JSON.stringify(value));
    }

    @Post()
    async post(@Body() entity: T, @Res() res: Response) {
        await this.genericService.save(entity).then(() => {
            res.sendStatus(HttpStatus.OK)
        }).catch(() => {
            res.sendStatus(HttpStatus.BAD_GATEWAY)
        })
    }

    @Get()
    async get(@Res() res: Response, @Req() req: Request) {
        res.send(await this.genericService.findAll())
        this.set(req.route.path, await this.genericService.findAll());
    }

    @Get('/:id')
    async getById(@Res() res: Response, @Param('id') id: number) {
        try {
            res.send(await this.genericService.findOne(id))
        } catch (error) {
            res.sendStatus(HttpStatus.BAD_GATEWAY)
        }
    }
}
