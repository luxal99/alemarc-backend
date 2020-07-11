import {AbstractController} from "./AbstractController";
import {User} from "../entity/User";

export class UserController extends AbstractController<User> {

    type = "user";

    save(entity: User) {
        super.save(entity);
    }


}
