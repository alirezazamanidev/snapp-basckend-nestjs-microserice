import { AUTH_SERVICE_NAME, IAuthService } from '@app/common';
import { Body, Controller, Get, Inject, OnModuleInit, Post, UseInterceptors } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ClientEnum } from '../../common/enums/client.enum';
import { GrpcErrorInterceptor } from '../../common/interceptors/grpc-error.interceptor';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SendOtpDto } from './dtos/auth.dto';
import { ContentType } from '../../common/enums/swagger.enum';

@Controller('auth')
@UseInterceptors(GrpcErrorInterceptor)
export class AuthController implements OnModuleInit {
  private authService:IAuthService
  constructor(@Inject(ClientEnum.USER_SERVICE) private readonly client:ClientGrpc) {}
  onModuleInit() {
    this.authService=this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  @ApiOperation({summary: 'Send OTP'})
  @Post('send-otp')
  @ApiConsumes(ContentType.Form,ContentType.Json)
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto);
  }
}
