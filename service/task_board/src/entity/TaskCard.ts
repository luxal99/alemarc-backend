import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, JoinTable, BaseEntity, OneToMany} from "typeorm";
import {TaskBoard} from "./TaskBoard";
import {CardStatus} from "./CardStatus";
import {CardAttachment} from "./CardAttachment";


@Entity()
export class TaskCard extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_task_card: number;

    @Column()
    header: string;

    @Column({length:10240})
    description: string;

    @Column()
    due_date: string;

    @Column()
    text: string;

    @ManyToOne(type => TaskBoard, id_task_board => id_task_board.cardList)
    @JoinTable()
    id_task_board: TaskBoard;

    @ManyToOne(type => CardStatus, id_card_status => id_card_status.cardList)
    id_card_status: CardStatus;

    @OneToMany(type => CardAttachment,cardAttachmentList=>cardAttachmentList.id_task_card)
    cardAttachmentList:CardAttachment[]

}
