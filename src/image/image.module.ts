import {Module} from '@nestjs/common';
import {ImageController} from './image.controller';
import {ImageService} from "./image.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImageRepository} from "../repository/image.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ImageRepository])],
    controllers: [ImageController],
    providers: [ImageService]
})
export class ImageModule {
}
