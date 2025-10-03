import { TypeOrmDbConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useClass:TypeOrmDbConfig
        })
    ]
})
export class DatabaseModule {}
