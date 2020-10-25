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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../generic/generic.service");
const blog_entity_1 = require("./blog.entity");
const blog_repository_1 = require("../repository/blog.repository");
const typeorm_1 = require("typeorm");
let BlogService = class BlogService extends generic_service_1.GenericService {
    constructor(repository) {
        super(repository, ['listOfTechnologies', 'listOfImages']);
        this.repository = repository;
    }
    async incrementView(id) {
        const blog = await this.findOne(id);
        let numberOfViews = blog.numberOfViews + 1;
        await typeorm_1.getConnection().createQueryBuilder().update(blog_entity_1.Blog).set({
            numberOfViews: numberOfViews
        }).where("id = :id", { id: blog.id }).execute();
    }
    async mostPopular() {
        const blogs = await this.findAll();
        blogs.sort((a, b) => (a.numberOfViews > b.numberOfViews ? -1 : 1));
        return blogs.splice(0, 3);
    }
};
BlogService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map