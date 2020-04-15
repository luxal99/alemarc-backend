import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, BaseEntity, JoinColumn} from "typeorm";
import {UserRole} from "./UserRole";
import {Client} from "./Client";
import {Admin} from "./Admin";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToOne(type => UserRole, id_user_role => id_user_role)
    id_user_role: UserRole;

    @OneToOne(type => Client)
    @JoinColumn()
    id_client: Client;

    @OneToOne(type => Admin)
    @JoinColumn()
    id_admin: Admin;



}
