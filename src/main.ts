import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.enableCors({
    origin: ['http://localhost:8080'],
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('nestjs-api')
    .setDescription('Nestjs API application template.')
    .setVersion('0.0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // http://localhost:8080/nestjs-api/api/
  SwaggerModule.setup('nestjs-api/api', app, documentFactory);

  await app.listen(app.get(ConfigService).get('APP_PORT'));
}
bootstrap();
