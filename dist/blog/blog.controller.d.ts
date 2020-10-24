import { GenericController } from "../generic/generic.controller";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
export declare class BlogController extends GenericController<Blog> {
    private readonly service;
    constructor(service: BlogService);
}
