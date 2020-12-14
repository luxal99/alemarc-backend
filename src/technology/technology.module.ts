import {Module} from '@nestjs/common';
import {TechnologyController} from './technology.controller';
import {TechnologyService} from './technology.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TechnologyRepository} from "../repository/technology.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TechnologyRepository])],
    controllers: [TechnologyController],
    providers: [TechnologyService]
})
export class TechnologyModule {
}

