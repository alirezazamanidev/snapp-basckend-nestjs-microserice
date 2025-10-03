import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientEnum } from '../../common/enums/client.enum';
@Module({
  imports:[
    ClientsModule.register([
      {
        name: ClientEnum.USER_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'protos/user.proto'),
          url: process.env.USER_GRPC_URL,
        },
      },
    ]),
  ],  
  controllers: [AuthController],
  
})
export class AuthModule {}
