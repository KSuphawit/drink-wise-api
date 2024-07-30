import { LoginRequest } from '@/modules/auth/requests/login.request';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(request: LoginRequest): Promise<string> {
    const user = await this.verifyUser(request);
    if (!user) throw new UnauthorizedException();

    // TODO: add logic to handle users are not verify email

    const accessToken = await this.jwtService.signAsync({
      sub: user.userId,
      email: user.email,
    });

    return accessToken;
  }

  private async verifyUser(request: LoginRequest): Promise<SignInData | null> {
    const user = await this.userService.findUserByEmail(request.email);
    const isPasswordCorrect = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (user && isPasswordCorrect)
      return {
        userId: user.id,
        email: user.email,
        isVerified: user.isVerified,
      };

    return null;
  }
}
