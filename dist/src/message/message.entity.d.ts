import { BaseEntity } from "typeorm";
export declare class Message extends BaseEntity {
    id: number;
    fullName: string;
    email: string;
    message: string;
    constructor(fullName: string, email: string, message: string);
}
