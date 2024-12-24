import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  await app.listen(app.get(ConfigService).get('APP_PORT'));
}
bootstrap();
