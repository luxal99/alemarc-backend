import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PORT} from "./constants/const";
async function bootstrap() {
  console.log(PORT)
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
