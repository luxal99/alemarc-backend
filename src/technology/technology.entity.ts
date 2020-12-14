import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Blog} from "../blog/blog.entity";
import {Base} from "../generic/base.entity";

@Entity()
export class Technology extends Base {


    @Column()
    title: string;

    @ManyToMany(type => Blog, blog => blog.listOfTechnologies)
    listOfBlogs: Blog[];


    constructor(title: string) {
        super();
        this.title = title;
    }
}
