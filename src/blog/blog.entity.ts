
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, BaseEntity, JoinTable} from "typeorm";
import {Image} from "../image/image.entity";
import {Technology} from "../technology/technology.entity";

@Entity()
export class Blog extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    header: string

    @Column()
    shortText: string;

    @Column({length:10240})
    longText: string;

    @Column()
    numberOfViews: number;

    @OneToMany(type => Image, listOfImages => listOfImages.idBlog)
    listOfImages: Image[];

    @ManyToMany(type => Technology, technology => technology.listOfBlogs)
    @JoinTable()
    listOfTechnologies: Technology[];


    constructor(header: string, shortText: string, longText: string, listOfTechnologies: Array<Technology>) {
        super();
        this.header = header;
        this.shortText = shortText;
        this.longText = longText;
        this.listOfTechnologies = listOfTechnologies;
        this.numberOfViews = 0;
    }
}
