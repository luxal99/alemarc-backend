import express = require("express");
import {Application, Request, Response} from "express";
import {AbstractService} from "../service/AbstractService";
import {BaseEntity} from "typeorm";

export class AbstractController<T extends BaseEntity> {

    protected app: Application
    protected service: AbstractService<T>

    protected type: string;


    constructor(type: string) {
        this.type = type;
    }

    save(entity: T) {
        this.app.post(`/${this.type}`, async (req: Request, res: Response) => {
            await this.service.save(entity);
        })
    }
}
