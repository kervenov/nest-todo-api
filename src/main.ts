import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Todo list api')
    .setDescription('The TODO API description')
    .setVersion('1.0')
    .addSecurity('token', {
      type: 'http',
      scheme: 'bearer',
    })
    .addTag('Todo-List-Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
