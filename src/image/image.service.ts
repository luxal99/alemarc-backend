import {Inject, Injectable} from "@nestjs/common";
import {GenericService} from "../generic/generic.service";
import {Image} from "./image.entity";
import {ImageRepository} from "../repository/image.repository";
import {Blog} from "../blog/blog.entity";

@Injectable()
export class ImageService extends GenericService<Image> {


    constructor(private readonly repository: ImageRepository) {
        super(repository, ['idBlog']);
    }

    async deleteAllWhereBlog(blog: Blog) {
        const images: Array<Image> = await this.findAll();

        for (const img of images) {
            if (img.idBlog.id === blog.id) {
                await this.delete(img.id)
            }
        }
    }
}
