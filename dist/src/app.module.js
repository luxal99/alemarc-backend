"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const image_module_1 = require("./image/image.module");
const message_module_1 = require("./message/message.module");
const technology_module_1 = require("./technology/technology.module");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("./image/image.entity");
const user_entity_1 = require("./user/user.entity");
const technology_entity_1 = require("./technology/technology.entity");
const message_entity_1 = require("./message/message.entity");
const blog_entity_1 = require("./blog/blog.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [image_module_1.ImageModule, message_module_1.MessageModule, technology_module_1.TechnologyModule, user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": "root",
                "password": "Luxal.99",
                "database": "alemarc",
                "synchronize": true,
                "logging": false,
                "entities": [
                    blog_entity_1.Blog,
                    image_entity_1.Image,
                    message_entity_1.Message,
                    technology_entity_1.Technology,
                    user_entity_1.User
                ],
                "migrations": [
                    "src/migration/**/*.ts"
                ],
                "subscribers": [
                    "src/subscriber/**/*.ts"
                ],
                "cli": {
                    "entitiesDir": "src/entity",
                    "migrationsDir": "src/migration",
                    "subscribersDir": "src/subscriber"
                }
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map