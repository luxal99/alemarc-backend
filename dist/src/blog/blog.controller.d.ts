import { GenericController } from "../generic/generic.controller";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { Response } from "express";
export declare class BlogController extends GenericController<Blog> {
    private readonly service;
    private imageService;
    constructor(service: BlogService);
    save(entity: Blog, res: Response): Promise<void>;
    getPopular(res: Response): Promise<void>;
    incrementView(entity: Blog, res: Response): Promise<void>;
    put(entity: Blog, res: Response): Promise<void>;
}
