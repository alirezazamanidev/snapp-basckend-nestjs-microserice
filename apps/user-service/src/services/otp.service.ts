import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomInt } from 'crypto';
import Redis from 'ioredis';
import { GrpcStatus, REDIS_CLIENT } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OtpService {
  private readonly OTP_EXPIRATION_MINUTES: number = Number(process.env.OTP_EXPIRATION_MINUTES) || 5;

  constructor(@Inject(REDIS_CLIENT) private redisClient: Redis) {}

  generateOtp(): string {
    return randomInt(10000, 99999).toString();
  }

  async saveOtp(key: string): Promise<string> {
    const otpCached = await this.redisClient.get(`otp:${key}`);
    if (otpCached) throw new RpcException({code: GrpcStatus.UNAUTHENTICATED, message: 'OTP not expired'});
    const otpCode = this.generateOtp();

    await this.redisClient.setex(
      `otp:${key}`,
      this.OTP_EXPIRATION_MINUTES * 60,
      otpCode,
    );
    return otpCode;
  }

  async verify(key: string, code: string) {
    const otpCached = await this.redisClient.get(`otp:${key}`);
    if (!otpCached) throw new RpcException({code: GrpcStatus.UNAUTHENTICATED, message: 'OTP expired'});
    if (otpCached !== code) throw new RpcException({code: GrpcStatus.UNAUTHENTICATED, message: 'OTP invalid'});
    
    await this.redisClient.del(`otp:${key}`);
    return true;
  }
}