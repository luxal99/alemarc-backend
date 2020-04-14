import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, BaseEntity, ManyToOne} from "typeorm";
import {TaskCard} from "./TaskCard";
import {Client} from "./Client";

@Entity()
export class TaskBoard extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_task_board: number;

    @Column()
    title: string;


    @OneToMany(type => TaskCard,cardList=>cardList.id_task_board)
    cardList:TaskCard[]

    @ManyToOne(type => Client,id_client=>id_client)
    id_client:Client;



}
