import {Controller, HttpStatus, Inject, Post, Res} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Technology} from "./technology.entity";
import {TechnologyService} from "./technology.service";

@Controller('technology')
export class TechnologyController extends GenericController<Technology> {

    constructor(private readonly service: TechnologyService) {
        super(service);
    }

}
