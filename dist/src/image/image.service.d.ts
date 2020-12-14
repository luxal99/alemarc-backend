import { GenericService } from "../generic/generic.service";
import { Image } from "./image.entity";
import { ImageRepository } from "../repository/image.repository";
import { Blog } from "../blog/blog.entity";
export declare class ImageService extends GenericService<Image> {
    private readonly repository;
    constructor(repository: ImageRepository);
    deleteAllWhereBlog(blog: Blog): Promise<void>;
}
