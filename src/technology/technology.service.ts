import {Injectable} from '@nestjs/common';
import {GenericService} from "../generic/generic.service";
import {Technology} from "./technology.entity";
import {TechnologyRepository} from "../repository/technology.repository";

@Injectable()
export class TechnologyService extends GenericService<Technology> {

    constructor(private readonly repository: TechnologyRepository) {
        super(repository,[]);
    }
}
