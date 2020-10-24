import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ImageModule} from './image/image.module';
import {MessageModule} from './message/message.module';
import {TechnologyModule} from './technology/technology.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Image} from "./image/image.entity";
import {User} from "./user/user.entity";
import {Technology} from "./technology/technology.entity";
import {Message} from "./message/message.entity";
import {Blog} from "./blog/blog.entity";

@Module({
    imports: [ImageModule, MessageModule, TechnologyModule, UserModule,
        TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": "root",
                "password": "Luxal.99",
                "database": "alemarc",
                "synchronize": true,
                "logging": false,
                "entities": [
                    Blog,
                    Image,
                    Message,
                    Technology,
                    User
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
            }
        )

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
