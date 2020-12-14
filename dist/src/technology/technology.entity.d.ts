import { Blog } from "../blog/blog.entity";
import { Base } from "../generic/base.entity";
export declare class Technology extends Base {
    title: string;
    listOfBlogs: Blog[];
    constructor(title: string);
}
