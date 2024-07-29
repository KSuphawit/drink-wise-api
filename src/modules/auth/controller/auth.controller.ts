import { LoginRequest } from '@/modules/auth/requests/login.request';
import { LoginResponse } from '@/modules/auth/responses/login.response';
import { AuthService } from '@/modules/auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    const accessToken = await this.authService.authenticate(request);
    return { accessToken };
  }
}
