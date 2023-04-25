import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Eventify')
    .setDescription('api for purchasing event tickets')
    .setVersion('1.0')
    .addTag('users')
    .addTag('organizer')
    .addTag('organizer_category')
    .addTag('event')
    .addTag('event_category')
    .addTag('tickets')
    .addTag('buy_tickets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
