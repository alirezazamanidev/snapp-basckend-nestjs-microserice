import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../database/entities/session.entity';
import { Repository } from 'typeorm';
import { REDIS_CLIENT } from '@app/common';
import Redis from 'ioredis';

@Injectable()
export class SessionService {
    private readonly ABSOLUTE_TTL_DAYS=Number(process.env.ABSOLUTE_TTL_DAYS) || 30;
   private  readonly SLIDING_TTL_SECONDS=Number(process.env.SLIDING_TTL_MINUTES) || 30
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  async create(userId: string, ip: string, userAgent: string) {
    const ABSOLUTE_TTL_DAYS = 30;
    const SLIDING_TTL_SECONDS = 60 * 30; // 30 دقیقه
    const expiresAt = new Date(Date.now() + ABSOLUTE_TTL_DAYS * 24 * 60 * 60 * 1000);

    const session = this.sessionRepository.create({ userId, expiresAt, ip, userAgent });
    const savedSession = await this.sessionRepository.save(session);
    const payload={userId,exp:expiresAt};
    await this.redisClient.setex(`session:${savedSession.id}`,SLIDING_TTL_SECONDS,JSON.stringify(payload));
    console.log(savedSession);
    return savedSession;
   
  }
}
