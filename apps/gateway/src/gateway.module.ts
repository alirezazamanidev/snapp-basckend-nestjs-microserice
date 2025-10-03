import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '@app/common/interfaces/user-service.interface';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ClientEnum } from './common/enums/client.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
   
    AuthModule,
  ],

})
export class GatewayModule {}
