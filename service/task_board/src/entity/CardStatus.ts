import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, JoinColumn} from "typeorm";
import {TaskCard} from "./TaskCard";

@Entity()
export class CardStatus {

    @PrimaryGeneratedColumn()
    id_card_status: number;

    @Column()
    title: string;

    @OneToMany(type => TaskCard,cardList=>cardList.id_card_status)
    cardList:TaskCard[]


}
