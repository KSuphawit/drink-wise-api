import { User } from '@/modules/users/entities/user.entity';
import { CreateUserRequest } from '@/modules/users/requests/create-user.request';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(request: CreateUserRequest): Promise<User> {
    const isExists = await this.findUserByEmail(request.email);

    if (isExists)
      throw new ConflictException('This email address is already exists');

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const user = this.usersRepository.create({
      email: request.email,
      password: hashedPassword,
      name: request.name,
      isVerified: false,
    });

    return await this.usersRepository.save(user);
  }
}
