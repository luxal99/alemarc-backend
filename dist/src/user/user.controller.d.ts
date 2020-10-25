import { User } from "./user.entity";
import { Response } from "express";
export declare class UserController {
    private userService;
    auth(entity: User, res: Response): Promise<void>;
}
