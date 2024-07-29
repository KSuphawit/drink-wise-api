import { User } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CreateUserRequest } from '@/modules/users/requests/create-user.request';
import { CreateUserResponse } from '@/modules/users/responses/create-user.response';
import { UserProfile } from '@/modules/users/responses/user-profile.response';
import { UserService } from '@/modules/users/services/users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const user = await this.userService.create(request);
    return new CreateUserResponse(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@User('id') id: string) {
    const user = await this.userService.findUserById(id);
    return new UserProfile(user);
  }
}
