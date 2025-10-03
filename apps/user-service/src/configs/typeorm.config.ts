import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {

    return {
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port:3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true,
      logging:
        process.env.NODE_ENV === 'development' ? ['error', 'warn'] : false,
    };
  }
}