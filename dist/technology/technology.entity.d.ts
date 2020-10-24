import { BaseEntity } from "typeorm";
import { Blog } from "../blog/blog.entity";
export declare class Technology extends BaseEntity {
    id: number;
    title: string;
    listOfBlogs: Blog[];
    constructor(title: string);
}
