import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';

import AuthModule from '@/auth/auth.module';
import DrinkingModule from '@/modules/drinking/drinking.module';
import UserModule from '@/modules/users/users.module';
import VerifiactionModule from '@/modules/verification/verification.module';
import AppProvidersModule from '@/providers/app-providers.module';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    AppProvidersModule,
    AuthModule,
    UserModule,
    DrinkingModule,
    VerifiactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
