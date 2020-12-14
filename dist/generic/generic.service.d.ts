import { GenericInterface } from "./generic.interface";
import { Repository } from "typeorm";
export declare class GenericService<T> implements GenericInterface<T> {
    private readonly genericRepository;
    private relations;
    constructor(genericRepository: Repository<T>, relations: Array<string>);
    delete(id: number): Promise<void>;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    save(entity: T): Promise<T>;
    update(id: number, entity: T): Promise<void>;
}
