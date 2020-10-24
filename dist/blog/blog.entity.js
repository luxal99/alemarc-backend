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
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const image_entity_1 = require("../image/image.entity");
const technology_entity_1 = require("../technology/technology.entity");
let Blog = class Blog extends typeorm_1.BaseEntity {
    constructor(header, shortText, longText, listOfTechnologies) {
        super();
        this.header = header;
        this.shortText = shortText;
        this.longText = longText;
        this.listOfTechnologies = listOfTechnologies;
        this.numberOfViews = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Blog.prototype, "header", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Blog.prototype, "shortText", void 0);
__decorate([
    typeorm_1.Column({ length: 10240 }),
    __metadata("design:type", String)
], Blog.prototype, "longText", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Blog.prototype, "numberOfViews", void 0);
__decorate([
    typeorm_1.OneToMany(type => image_entity_1.Image, listOfImages => listOfImages.idBlog),
    __metadata("design:type", Array)
], Blog.prototype, "listOfImages", void 0);
__decorate([
    typeorm_1.ManyToMany(type => technology_entity_1.Technology, technology => technology.listOfBlogs),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Blog.prototype, "listOfTechnologies", void 0);
Blog = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, Array])
], Blog);
exports.Blog = Blog;
//# sourceMappingURL=blog.entity.js.map