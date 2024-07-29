import { LoginRequest } from '@/modules/auth/requests/login.request';
import { AuthService } from '@/modules/auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() request: LoginRequest) {
    return this.authService.authenticate(request);
  }
}
