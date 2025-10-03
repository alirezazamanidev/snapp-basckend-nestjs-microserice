import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { swaggerConfig } from './configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);
  // configs
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionFilter());
  //swagger config
  if (process.env.NODE_ENV === 'development') {
    swaggerConfig(app);
  }
  
  await app.listen(process.env.GATEWAY_PORT || 8000, () => {
    console.log(`Gateway is running on  http://localhost:${process.env.GATEWAY_PORT}/api`);
    console.log(`swagger is running on  http://localhost:${process.env.GATEWAY_PORT}/swagger`);
  });
}
bootstrap();
