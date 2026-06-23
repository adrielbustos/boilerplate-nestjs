import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/http/nestjs/app.module';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env';

async function bootstrap() {
  process.env.TZ = 'UTC';
  const configService = new ConfigService();
  new Environment(configService);
  const app = await NestFactory.create(AppModule);
  console.log(Environment.PORT);
  await app.listen(Environment.PORT ?? 3000);
}
bootstrap();
