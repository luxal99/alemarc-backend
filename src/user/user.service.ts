import {User} from "./user.entity";

export class UserService {

    findByUsername(username: string): Promise<User> {
        return User.findOne({where: {username: username}})
    }
}
