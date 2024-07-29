import { AuthConfiguration } from '@/config/auth.configuration';
import { AuthController } from '@/modules/auth/controller/auth.controller';
import { AuthService } from '@/modules/auth/services/auth.service';
import { UsersModule } from '@/modules/users/users.module';
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
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
