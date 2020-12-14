import { BaseEntity } from "typeorm";
import { Blog } from "../blog/blog.entity";
export declare class Image extends BaseEntity {
    id: number;
    url: string;
    idBlog: Blog;
    constructor(url?: string, idBlog?: Blog);
}
