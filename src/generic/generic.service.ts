import {BadGatewayException, Injectable} from "@nestjs/common";
import {GenericInterface} from "./generic.interface";
import {Repository} from "typeorm";

@Injectable()
export class GenericService<T> implements GenericInterface<T> {

    constructor(
        private readonly genericRepository: Repository<T>, private relations: Array<string>) {
    }

    delete(id: number) {
    }

    findAll(): Promise<T[]> {
        return this.genericRepository.find({relations: this.relations});
    }

    async findOne(id: number): Promise<T> {
        return await this.genericRepository.findOne(id, {relations: this.relations})
    }

    async save(entity: T): Promise<T> {
        try {
            return await this.genericRepository.save(entity)
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    update(id: number, entity: T): Promise<T> {
        return Promise.resolve(undefined);
    }

}
