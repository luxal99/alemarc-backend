import {EntityRepository, Repository} from "typeorm";
import {Technology} from "../technology/technology.entity";

@EntityRepository(Technology)
export class TechnologyRepository extends Repository<Technology> {

}
