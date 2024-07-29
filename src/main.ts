import { AppModule } from '@/app.module';
import { AppConfiguration } from '@/config/app.configuration';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api', { exclude: ['health', 'auth'] });
  const appConfig = app.get(AppConfiguration);
  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
