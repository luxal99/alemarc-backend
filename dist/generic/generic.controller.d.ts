import { GenericService } from "./generic.service";
import { Response, Request } from "express";
export declare class GenericController<T> {
    private readonly genericService;
    constructor(genericService: GenericService<T>);
    post(entity: T, res: Response): Promise<void>;
    get(res: Response, req: Request): Promise<void>;
    getById(res: Response, id: number): Promise<void>;
}
