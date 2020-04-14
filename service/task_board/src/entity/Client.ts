import {BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {TaskBoard} from "./TaskBoard";

@Entity()
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_client: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    mail: string;

    @OneToMany(type => TaskBoard, taskBoardList => taskBoardList.id_client)
    taskBoardList: TaskBoard[];
}