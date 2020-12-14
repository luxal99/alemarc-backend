import {PrimaryGeneratedColumn} from "typeorm";

export class Base {
    @PrimaryGeneratedColumn()
    id: number;
}
