import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Todo list api')
    .setDescription('The TODO API description')
    .setVersion('1.0')
    .addSecurity('token', {
      type: 'apiKey',
      scheme: 'Bearer',
      in: 'header',
      name: 'authorization',
    })
    .addTag('Todo-List-Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
