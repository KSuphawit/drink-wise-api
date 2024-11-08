import { CreateUserRequest } from '@/modules/users/dto/requests/create-user.request';
import { UserDto } from '@/modules/users/dto/user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? new UserDto(user) : null;
  }

  async findUserById(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? new UserDto(user) : null;
  }

  async create(request: CreateUserRequest): Promise<UserDto> {
    const isExists = await this.findUserByEmail(request.email);

    if (isExists)
      throw new ConflictException('This email address is already exists');

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const user = this.userRepository.create({
      email: request.email,
      password: hashedPassword,
      name: request.name,
      isVerified: false,
    });

    const newUser = await this.userRepository.save(user);

    return new UserDto(newUser);
  }
}
