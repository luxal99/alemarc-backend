import {PrimaryGeneratedColumn} from "typeorm";

export class Base {

    //Id autogenerado que sera extendido
    // @ts-ignore
    @PrimaryGeneratedColumn()
    id: number;


}
