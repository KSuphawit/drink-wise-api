import { User } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { UserDTO } from '@/modules/user/dto/user.dto';
import UserSecureInterceptor from '@/modules/user/interceptors/user-secure.interceptor';
import { CreateUserRequest } from '@/modules/user/requests/create-user.request';
import { UserService } from '@/modules/user/services/user.service';
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
