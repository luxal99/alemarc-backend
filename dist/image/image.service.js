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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../generic/generic.service");
const image_repository_1 = require("../repository/image.repository");
let ImageService = class ImageService extends generic_service_1.GenericService {
    constructor(repository) {
        super(repository, ['idBlog']);
        this.repository = repository;
    }
    async deleteAllWhereBlog(blog) {
        const images = await this.findAll();
        for (const img of images) {
            if (img.idBlog.id === blog.id) {
                await this.delete(img.id);
            }
        }
    }
};
ImageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [image_repository_1.ImageRepository])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map