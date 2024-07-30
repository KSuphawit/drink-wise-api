import { AuthService } from '@/auth/auth.service';
import { LoginRequest } from '@/auth/dto/requests/login.request';
import { LoginResponse } from '@/auth/dto/responses/login.response';
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
