import { GenericService } from "../generic/generic.service";
import { Blog } from "./blog.entity";
import { BlogRepository } from "../repository/blog.repository";
export declare class BlogService extends GenericService<Blog> {
    private readonly repository;
    constructor(repository: BlogRepository);
}
