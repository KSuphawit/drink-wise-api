import { User } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { UserDTO } from '@/modules/users/dto/user.dto';
import UserSecureInterceptor from '@/modules/users/interceptors/user-secure.interceptor';
import { CreateUserRequest } from '@/modules/users/requests/create-user.request';
import { UserService } from '@/modules/users/services/users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(UserSecureInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() request: CreateUserRequest): Promise<UserDTO> {
    return await this.userService.create(request);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@User('id') id: string): Promise<UserDTO> {
    return await this.userService.findUserById(id);
  }
}
