import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule,{
   transport:Transport.GRPC,
   options:{
    package :USER_PACKAGE_NAME,
    protoPath:join(process.cwd(),'protos/user.proto'),
    url:process.env.USER_GRPC_URL
   }
  });
  await app.listen();
  console.log(`
    🚀  User  Service is UP & Running!
    ----------------------------------
    📦 Service:   User
    🔌 Protocol:  gRPC
    🌍 Address: ${process.env.USER_GRPC_URL}
    📂 Proto:     protos/user.proto
    ----------------------------------
    ✅ Ready to accept gRPC requests!
    `);
}
bootstrap();
