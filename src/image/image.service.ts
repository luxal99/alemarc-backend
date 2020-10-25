import {Injectable} from "@nestjs/common";
import {GenericService} from "../generic/generic.service";
import {Image} from "./image.entity";
import {ImageRepository} from "../repository/ImageRepository";

@Injectable()
export class ImageService extends GenericService<Image> {

    constructor(private readonly repository: ImageRepository) {
        super(repository, []);
    }
}
