import { BaseEntity } from "typeorm";
export declare class GenericEntity extends BaseEntity {
    id: number;
    entity: Object;
    constructor(obj: {});
}
