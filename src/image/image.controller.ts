import {Controller} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Image} from "./image.entity";
import {ImageService} from "./image.service";

@Controller('image')
export class ImageController extends GenericController<Image> {

    constructor(private service: ImageService) {
        super(service);
    }
}
