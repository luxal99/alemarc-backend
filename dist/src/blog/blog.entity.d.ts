import { BaseEntity } from "typeorm";
import { Image } from "../image/image.entity";
import { Technology } from "../technology/technology.entity";
export declare class Blog extends BaseEntity {
    id: number;
    header: string;
    shortText: string;
    longText: string;
    numberOfViews: number;
    listOfImages: Image[];
    listOfTechnologies: Technology[];
    constructor(header: string, shortText: string, longText: string, listOfTechnologies: Array<Technology>);
}
