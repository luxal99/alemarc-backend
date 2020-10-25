import {Entity, EntityRepository, Repository} from "typeorm";
import {User} from "../user/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}