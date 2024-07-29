import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';

import AuthModule from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { MSSQLModule } from '@/providers/database/mssql.module';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    MSSQLModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
