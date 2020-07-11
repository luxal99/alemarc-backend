import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Blog} from "./Blog";

@Entity()
export class Technology extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(type => Blog, blog => blog.listOfTechnologies)
    listOfBlogs: Blog[];


    constructor(title: string) {
        super();
        this.title = title;
    }
}
