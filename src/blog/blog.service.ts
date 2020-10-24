import {Injectable} from "@nestjs/common";
import {GenericService} from "../generic/generic.service";
import {Blog} from "./blog.entity";
import {BlogRepository} from "../repository/blog.repository";

@Injectable()
export class BlogService extends GenericService<Blog> {


    constructor(private readonly repository: BlogRepository) {
        super(repository, ['listOfTechnologies', 'listOfImages']);
    }
}
