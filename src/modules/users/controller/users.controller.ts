import { UserService } from '@/modules/users/services/users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('register')
  register(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.create(createUserRequest);
  }
}
