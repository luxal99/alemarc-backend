import {Controller} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Blog} from "./blog.entity";
import {BlogService} from "./blog.service";

@Controller('blog')
export class BlogController extends GenericController<Blog> {
    constructor(private readonly service:BlogService) {
        super(service);
    }
}
