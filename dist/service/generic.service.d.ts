import { BaseEntity, EntityManager } from "typeorm";
export declare class GenericService<T extends BaseEntity> {
    protected manager: EntityManager;
    constructor();
    save(entity: T): Promise<void>;
    delete(entity: T): Promise<void>;
}
