import { DatabaseConfiguration } from '@/config/database.configuration';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (databaseConfig: DatabaseConfiguration) => ({
        type: 'mssql',
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.databeseName,
        autoLoadEntities: true,
      }),
      inject: [DatabaseConfiguration],
    }),
  ],
})
export class MSSQLModule {}
