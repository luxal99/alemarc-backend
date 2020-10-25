import { User } from "./user.entity";
import { UserRepository } from "../repository/user.repository";
export declare class UserService {
    private repository;
    constructor(repository: UserRepository);
    findByUsername(username: string): Promise<User>;
}
