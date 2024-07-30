import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';

import AuthModule from '@/modules/auth/auth.module';
import UserModule from '@/modules/user/user.module';
import InfrastructureModule from '@/providers/infrastructure.module';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    InfrastructureModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
