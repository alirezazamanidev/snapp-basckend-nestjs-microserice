import { AUTH_SERVICE_NAME, IAuthService } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ClientEnum } from '../../common/enums/client.enum';
import { GrpcErrorInterceptor } from '../../common/interceptors/grpc-error.interceptor';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { checkOtpDto, SendOtpDto } from './dtos/auth.dto';
import { ContentType } from '../../common/enums/swagger.enum';
import type { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
@UseInterceptors(GrpcErrorInterceptor)
export class AuthController implements OnModuleInit {
  private authService: IAuthService;
  constructor(
    @Inject(ClientEnum.USER_SERVICE) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.authService = this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  @ApiOperation({ summary: 'Send OTP' })
  @Post('send-otp')
  @ApiConsumes(ContentType.Form, ContentType.Json)
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto);
  }
  @ApiOperation({ summary: 'Check OTP' })
  @Post('check-otp')
  @ApiConsumes(ContentType.Form, ContentType.Json)
  async checkOtp(
    @Body() dto: checkOtpDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await lastValueFrom(this.authService.checkOtp({
      ...dto,
      ip: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    }));
    console.log(response);
    res.cookie('s.id', response.sessionId, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
    }).send('OTP verified successfully');
  }
}
