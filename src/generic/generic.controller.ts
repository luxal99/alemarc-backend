import {GenericService} from "./generic.service";
import {Body, HttpStatus, Post, Res} from "@nestjs/common";
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
}
