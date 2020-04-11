import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, JoinColumn, BaseEntity, ManyToOne} from "typeorm";
import {TaskCard} from "./TaskCard";

@Entity()
export class CardAttachment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_card_attachemnt: number;

    @Column()
    url: string;

    @ManyToOne(type => TaskCard, id_task_card => id_task_card.cardAttachmentList)
    id_task_card: TaskCard




}
