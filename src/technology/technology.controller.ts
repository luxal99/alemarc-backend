import {Controller, HttpStatus, Inject, Post, Res} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Technology} from "./technology.entity";
import {TechnologyService} from "./technology.service";
import {TECHNOLOGY_ROUTE} from "../constants/const";

@Controller(TECHNOLOGY_ROUTE)
export class TechnologyController extends GenericController<Technology> {

    constructor(private readonly service: TechnologyService) {
        super(service);
    }

}
