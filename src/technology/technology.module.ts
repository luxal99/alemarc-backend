import { Module } from '@nestjs/common';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';

@Module({
  imports:[],
  controllers: [TechnologyController],
  providers: [TechnologyService]
})
export class TechnologyModule {}
