import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_user_role: number;

    @Column()
    role_name: string;

    @OneToMany(type => User, userList => userList.id_user_role)
    userList: User[];

}