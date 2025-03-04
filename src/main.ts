import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ALLOWED_ORIGINS } from './common/config';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.enableCors({
    origin: ALLOWED_ORIGINS,
  });

  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('nestjs-mysql-typeorm-template')
    .setDescription('Nestjs API application template.')
    .setVersion('0.0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('nestjs-api/api', app, documentFactory);

  // http://localhost:8080/nestjs-api/api/
  await app.listen(app.get(ConfigService).get('APP_PORT'));
}
bootstrap();
