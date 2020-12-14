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
const common_1 = require("@nestjs/common");
class GenericController {
    constructor(genericService) {
        this.genericService = genericService;
    }
    async post(entity, res) {
        await this.genericService.save(entity).then(() => {
            res.sendStatus(common_1.HttpStatus.OK);
        }).catch(() => {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        });
    }
    async get(res, req) {
        const arr = await this.genericService.findAll();
        res.send(arr.reverse());
    }
    async getById(res, id) {
        try {
            res.send(await this.genericService.findOne(id));
        }
        catch (error) {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        }
    }
}
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GenericController.prototype, "post", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GenericController.prototype, "get", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GenericController.prototype, "getById", null);
exports.GenericController = GenericController;
//# sourceMappingURL=generic.controller.js.map