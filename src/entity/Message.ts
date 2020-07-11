import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {MinLength} from "class-validator";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    fullName: string

    @Column()
    @MinLength(6)
    email: string

    @Column()
    @MinLength(6)
    message: string;


    constructor(fullName: string, email: string, message: string) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.message = message;

    }

}
