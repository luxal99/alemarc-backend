import { GenericService } from "./generic.service";
import { Response } from "express";
export declare class GenericController<T> {
    private readonly genericService;
    constructor(genericService: GenericService<T>);
    post(entity: T, res: Response): Promise<void>;
}
