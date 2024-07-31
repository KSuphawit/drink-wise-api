import { User } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CreateUserRequest } from '@/modules/users/dto/requests/create-user.request';
import { UserDto } from '@/modules/users/dto/user.dto';
import { UsersTransformInterceptor } from '@/modules/users/interceptors/users-transform.interceptor';
import { UsersService } from '@/modules/users/users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(UsersTransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() request: CreateUserRequest): Promise<UserDto> {
    return await this.userService.create(request);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@User('id') id: string): Promise<UserDto> {
    return await this.userService.findUserById(id);
  }
}
