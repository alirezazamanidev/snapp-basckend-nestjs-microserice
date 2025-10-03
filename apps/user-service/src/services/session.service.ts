import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionEntity } from "../database/entities/session.entity";
import { Repository } from "typeorm";

@Injectable()
export class SessionService {
    constructor(@InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>) {}
}