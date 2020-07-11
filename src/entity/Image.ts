import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Blog} from "./Blog";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => Blog, id => id.listOfImages)
    idBlog: Blog;


    constructor(url?: string, idBlog?: Blog) {
        super();
        this.url = url;
        this.idBlog = idBlog;
    }
}
