import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 💡 Habilitar CORS para permitir conexiones desde el frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
