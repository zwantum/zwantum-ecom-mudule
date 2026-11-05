import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';

async function bootstrap() {
  const logger = new Logger('ZwantumBootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port', 4000);
  const apiPrefix = configService.get<string>('apiPrefix', 'api/v1');
  const corsOrigins = configService.get<string[]>('corsOrigins', ['*']);

  // Global prefixes and middleware
  app.setGlobalPrefix(apiPrefix);
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Global filters, interceptors, and pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ZodValidationPipe());

  // Enable graceful shutdown hooks for persistent Node.js runtime
  app.enableShutdownHooks();

  await app.listen(port);
  logger.log(`🚀 Zwantum Commerce API is running on: http://localhost:${port}/${apiPrefix}`);
  logger.log(`🩺 Health check endpoint: http://localhost:${port}/${apiPrefix}/health`);
}

bootstrap();
