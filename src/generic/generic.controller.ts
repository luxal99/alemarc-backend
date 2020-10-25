import {GenericService} from "./generic.service";
import {Body, Get, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {Response} from "express";

export class GenericController<T> {
    constructor(private readonly genericService: GenericService<T>) {
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
    async get(@Res() res: Response) {
        res.send(await this.genericService.findAll())
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
