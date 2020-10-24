import { GenericService } from "../generic/generic.service";
import { Technology } from "./technology.entity";
import { TechnologyRepository } from "../repository/technology.repository";
export declare class TechnologyService extends GenericService<Technology> {
    private readonly repository;
    constructor(repository: TechnologyRepository);
}
