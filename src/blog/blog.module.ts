import {Module} from '@nestjs/common';
import {BlogController} from './blog.controller';
import {BlogService} from "./blog.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogRepository} from "../repository/blog.repository";
import {ImageService} from "../image/image.service";
import {ImageRepository} from "../repository/ImageRepository";

@Module({
    imports: [TypeOrmModule.forFeature([BlogRepository,ImageRepository])],
    controllers: [BlogController],
    providers: [BlogService, ImageService]
})
export class BlogModule {
}
