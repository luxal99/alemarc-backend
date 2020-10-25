"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    async auth(entity, res) {
        try {
            const user = await this.userService.findByUsername(entity.username);
            const auth = ((user != null && await bcrypt.compare(entity.password, user.password))
                ? res.send(user.password) : res.sendStatus(403));
        }
        catch (_a) {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    common_1.Post('/auth'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "auth", null);
UserController = __decorate([
    common_1.Controller('user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map