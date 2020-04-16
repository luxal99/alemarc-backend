import {BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {TaskBoard} from "./TaskBoard";

@Entity()
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_client: number;

    @Column()
    fullname: string;

    @Column()
    mail: string;

    secretKey:string;

    @OneToMany(type => TaskBoard, taskBoardList => taskBoardList.id_client)
    taskBoardList: TaskBoard[];


}