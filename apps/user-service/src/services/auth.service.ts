import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import {
  ICheckOtpRequest,
  ICheckOtpResponse,
  ISendOtpRequest,
  ISendOtpResponse,
  REDIS_CLIENT,
} from '@app/common';
import Redis from 'ioredis';
import { OtpService } from './otp.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
    private readonly otpService: OtpService,
    private readonly sessionService: SessionService,
  ) {}

  async sendOtp(payload: ISendOtpRequest): Promise<ISendOtpResponse> {
    const { phone } = payload;
    const otp = await this.otpService.saveOtp(phone);
    // send otp to phone
    return {
      message: 'OTP sent successfully',
      otp: process.env.NODE_ENV === 'development' ? otp : '',
    };
  }
  async checkOtp(payload: ICheckOtpRequest): Promise<ICheckOtpResponse> {
    console.log(payload);
    const { otp, phone, ip, userAgent } = payload;
    await this.otpService.verify(phone, otp);
    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = this.userRepository.create({ phone, isPhoneVerified: true });
      user = await this.userRepository.save(user);
    }
    if (!user.isPhoneVerified)
      await this.userRepository.update(user.id, { isPhoneVerified: true });
    // create session
    const session = await this.sessionService.create(user.id, ip, userAgent);
    console.log(session);
    return { message: 'OTP verified successfully',sessionId:session.id };
  }
}
