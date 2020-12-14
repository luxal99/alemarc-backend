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
const generic_controller_1 = require("../generic/generic.controller");
const blog_entity_1 = require("./blog.entity");
const blog_service_1 = require("./blog.service");
const image_service_1 = require("../image/image.service");
const image_entity_1 = require("../image/image.entity");
let BlogController = class BlogController extends generic_controller_1.GenericController {
    constructor(service) {
        super(service);
        this.service = service;
    }
    async save(entity, res) {
        await this.service.save(entity).then(async () => {
            for (const img of entity.listOfImages) {
                await this.imageService.save(new image_entity_1.Image(img.url, entity));
            }
        }).then(() => {
            res.sendStatus(common_1.HttpStatus.OK);
        }).catch(() => {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        });
    }
    async getPopular(res) {
        try {
            res.send(await this.service.mostPopular());
        }
        catch (e) {
            res.send(common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async incrementView(entity, res) {
        await this.service.incrementView(entity.id).then(() => {
            res.sendStatus(common_1.HttpStatus.OK);
        }).catch(() => {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        });
    }
    async put(entity, res) {
        await this.service.update(entity.id, entity).then(async () => {
            this.service.updateTechnology(entity).then(async () => {
            }).then(async () => {
                const blog = await this.service.findOne(entity.id);
                await this.imageService.deleteAllWhereBlog(blog).then(async () => {
                    for (const img of entity.listOfImages) {
                        await this.imageService.save(new image_entity_1.Image(img.url, blog)).catch(() => {
                            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
                        });
                    }
                }).then(() => {
                    res.sendStatus(common_1.HttpStatus.OK);
                });
            });
        }).catch(() => {
            res.sendStatus(common_1.HttpStatus.BAD_GATEWAY);
        });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", image_service_1.ImageService)
], BlogController.prototype, "imageService", void 0);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.Blog, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "save", null);
__decorate([
    common_1.Post('/popular'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPopular", null);
__decorate([
    common_1.Put('/view'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.Blog, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "incrementView", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.Blog, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "put", null);
BlogController = __decorate([
    common_1.Controller('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map