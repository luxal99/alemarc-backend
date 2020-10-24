import { GenericInterface } from "./generic.interface";
import { Repository } from "typeorm";
export declare class GenericService<T> implements GenericInterface<T> {
    private readonly genericRepository;
    constructor(genericRepository: Repository<T>);
    delete(id: number): void;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    save(entity: T): Promise<void>;
    update(id: number, entity: T): Promise<T>;
}
