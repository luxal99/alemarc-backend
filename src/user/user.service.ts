import {GenericService} from "../generic/generic.service";
import {User} from "./user.entity";
import {UserRepository} from "../repository/user.repository";
import {getConnection} from "typeorm";

export class UserService {

    constructor(private repository: UserRepository) {
    }

    findByUsername(username: string): Promise<User> {
        return User.findOne({where: {username: username}})
    }
}
