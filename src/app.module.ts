import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ImageModule} from './image/image.module';
import {MessageModule} from './message/message.module';
import {TechnologyModule} from './technology/technology.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogModule} from "./blog/blog.module";
import {ConfigModule} from "@nestjs/config";
import {JWTMiddle} from "./middleware/verify.middle";
import {
    BLOG_ROUTE,
    DB_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    IMAGE_ROUTE,
    LIST_OF_ENTITIES,
    TECHNOLOGY_ROUTE
} from "./constants/const";

@Module({
    imports: [ImageModule, MessageModule, TechnologyModule, UserModule, BlogModule,
        TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": DB_USERNAME,
                "password": DB_PASSWORD,
                "database": DB_NAME,
                "synchronize": true,
                "logging": false,
                "entities": LIST_OF_ENTITIES
            }
        ), ConfigModule.forRoot({
            isGlobal: true
        })

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(JWTMiddle).forRoutes(
            {path: BLOG_ROUTE, method: RequestMethod.POST},
            {path: BLOG_ROUTE, method: RequestMethod.PUT},
            {path: TECHNOLOGY_ROUTE, method: RequestMethod.POST},
            {path: TECHNOLOGY_ROUTE, method: RequestMethod.PUT},
            {path: IMAGE_ROUTE, method: RequestMethod.POST},
            {path: IMAGE_ROUTE, method: RequestMethod.PUT},
        );
    }
}
