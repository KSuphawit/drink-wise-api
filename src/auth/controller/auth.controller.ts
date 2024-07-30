import { LoginRequest } from '@/auth/requests/login.request';
import { LoginResponse } from '@/auth/responses/login.response';
import { AuthService } from '@/auth/services/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    const accessToken = await this.authService.authenticate(request);
    return { accessToken };
  }
}
