import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, BaseEntity} from "typeorm";
import {TaskCard} from "./TaskCard";

@Entity()
export class TaskBoard extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_task_board: number;

    @Column()
    title: string;

    @OneToMany(type => TaskCard,cardList=>cardList.id_task_board)
    cardList:TaskCard[]



}
