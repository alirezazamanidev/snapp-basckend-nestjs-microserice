import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { RedisModule } from '@app/common';
import { OtpService } from './services/otp.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    DatabaseModule,
    RedisModule.forRoot(process.env.REDIS_URL as string),
   
  ],
  controllers: [UserController,AuthController],
  providers: [UserService,AuthService,SessionService,OtpService],
})
export class UserModule {}
