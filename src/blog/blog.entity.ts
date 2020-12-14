import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, BaseEntity, JoinTable} from "typeorm";
import {Image} from "../image/image.entity";
import {Technology} from "../technology/technology.entity";
import {Base} from "../generic/base.entity";

@Entity()
export class Blog extends Base {

    @Column()
    header: string

    @Column()
    shortText: string;

    @Column({length: 10240})
    longText: string;

    @Column({default:0})
    numberOfViews: number;

    @OneToMany(type => Image, listOfImages => listOfImages.idBlog)
    listOfImages: Image[];

    @ManyToMany(type => Technology, technology => technology.listOfBlogs)
    @JoinTable()
    listOfTechnologies: Technology[];


    constructor() {
        super();
    }
}
