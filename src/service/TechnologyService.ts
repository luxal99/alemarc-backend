import {AbstractService} from "./AbstractService";
import {Technology} from "../entity/Technology";

export class TechnologyService extends AbstractService<Technology> {


    async save(entity: Technology): Promise<void> {
        await super.save(entity);
    }

    async delete(entity: Technology): Promise<void> {
        await super.delete(entity);
    }
}
