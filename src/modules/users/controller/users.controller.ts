import { CreateUserRequest } from '@/modules/users/requests/create-user.request';
import { UserService } from '@/modules/users/services/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() request: CreateUserRequest) {
    // TODO: send email verification code
    return this.userService.create(request);
  }
}
