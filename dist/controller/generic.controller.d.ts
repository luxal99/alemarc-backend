import { Response } from "express";
import { BaseEntity } from "typeorm";
export declare class GenericController<T extends BaseEntity> {
    private genericService;
    save(entity: T, resp: Response): Promise<void>;
}
