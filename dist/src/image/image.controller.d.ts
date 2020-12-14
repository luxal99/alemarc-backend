import { GenericController } from "../generic/generic.controller";
import { Image } from "./image.entity";
import { ImageService } from "./image.service";
export declare class ImageController extends GenericController<Image> {
    private service;
    constructor(service: ImageService);
}
