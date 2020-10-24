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
const typeorm_1 = require("typeorm");
const blog_entity_1 = require("../blog/blog.entity");
let Image = class Image extends typeorm_1.BaseEntity {
    constructor(url, idBlog) {
        super();
        this.url = url;
        this.idBlog = idBlog;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(type => blog_entity_1.Blog, id => id.listOfImages),
    __metadata("design:type", blog_entity_1.Blog)
], Image.prototype, "idBlog", void 0);
Image = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, blog_entity_1.Blog])
], Image);
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map