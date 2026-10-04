import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: (process.env.API_CORS_ORIGINS ?? 'http://localhost:3000').split(','),
    credentials: true,
  });
  app.enableShutdownHooks();

  if (process.env.NODE_ENV !== 'production') {
    const doc = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Freshman+ API').setVersion('1.0').addBearerAuth().build(),
    );
    SwaggerModule.setup('docs', app, doc);
  }

  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);
  console.warn(`Freshman+ API listening on http://localhost:${port}/api/v1`);
}

void bootstrap();
