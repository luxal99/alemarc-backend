import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, JoinTable} from "typeorm";
import {TaskBoard} from "./TaskBoard";
import {CardStatus} from "./CardStatus";


@Entity()
export class TaskCard {

    @PrimaryGeneratedColumn()
    id_task_card: number;

    @Column()
    header: string;

    @Column()
    description: string;

    @Column()
    due_date: Date;

    @ManyToOne(type => TaskBoard, id_task_board => id_task_board.cardList)
    @JoinTable()
    id_task_board: TaskBoard

    @ManyToOne(type => CardStatus, id_card_status => id_card_status.cardList)
    id_card_status: CardStatus
}
