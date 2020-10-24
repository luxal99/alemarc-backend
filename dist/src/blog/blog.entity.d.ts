import { Image } from "../image/image.entity";
import { Technology } from "../technology/technology.entity";
import { Base } from "../generic/base.entity";
export declare class Blog extends Base {
    header: string;
    shortText: string;
    longText: string;
    numberOfViews: number;
    listOfImages: Image[];
    listOfTechnologies: Technology[];
    constructor(header: string, shortText: string, longText: string, listOfTechnologies: Array<Technology>);
}
