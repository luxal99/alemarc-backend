import { GenericController } from "../generic/generic.controller";
import { Technology } from "./technology.entity";
import { TechnologyService } from "./technology.service";
export declare class TechnologyController extends GenericController<Technology> {
    private readonly service;
    constructor(service: TechnologyService);
}
