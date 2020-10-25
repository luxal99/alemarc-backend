"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    findByUsername(username) {
        return user_entity_1.User.findOne({ where: { username: username } });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map