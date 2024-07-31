import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { AuthConfiguration } from '@/config/auth.configuration';
import UserModule from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (authConfig: AuthConfiguration) => ({
        secret: authConfig.jwtSecret,
        signOptions: { expiresIn: authConfig.expireDuration },
      }),
      inject: [AuthConfiguration],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
