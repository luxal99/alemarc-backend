import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TaskBoard} from "./TaskBoard";

@Entity()
export class Admin extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_admin: number;

    @Column()
    full_name: string;

}