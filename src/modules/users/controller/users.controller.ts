import { CreateUserRequest } from '@/modules/users/requests/create-user.request';
import { CreateUserResponse } from '@/modules/users/responses/create-user.response';
import { UserService } from '@/modules/users/services/users.service';
import { Body, Controller, Post } from '@nestjs/common';

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
}
