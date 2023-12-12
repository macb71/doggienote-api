import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import configuration from './config/configuration';

async function bootstrap() {
  const logger = new Logger();
  const config = configuration();
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
  logger.log(`Server listening: http://localhost:${config.PORT}`);
  
}
bootstrap();
