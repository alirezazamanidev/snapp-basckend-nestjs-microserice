import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { ISendOtpRequest, ISendOtpResponse, REDIS_CLIENT } from '@app/common';
import Redis from 'ioredis';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
    private readonly otpService: OtpService,
  ) {}

  async sendOtp(payload: ISendOtpRequest): Promise<ISendOtpResponse> {
    const { phone } = payload;
    const otp=await this.otpService.saveOtp(phone);
    // send otp to phone
    return {message: 'OTP sent successfully'};
  }
}
