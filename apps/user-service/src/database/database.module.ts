import { TypeOrmDbConfig } from '../configs/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';
import { UserEntity } from './entities/user.entity';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useClass:TypeOrmDbConfig
        }),
        TypeOrmModule.forFeature([UserEntity,SessionEntity])
    ],
    exports:[TypeOrmModule]
})
export class DatabaseModule {}
