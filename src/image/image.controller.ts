import {Controller} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Image} from "./image.entity";
import {ImageService} from "./image.service";
import {IMAGE_ROUTE} from "../constants/const";

@Controller(IMAGE_ROUTE)
export class ImageController extends GenericController<Image> {

    constructor(private service: ImageService) {
        super(service);
    }
}
