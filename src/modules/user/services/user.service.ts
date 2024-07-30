import { UserDTO } from '@/modules/user/dto/user.dto';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserRequest } from '@/modules/user/requests/create-user.request';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? new UserDTO(user) : null;
  }

  async findUserById(id: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? new UserDTO(user) : null;
  }

  async create(request: CreateUserRequest): Promise<UserDTO> {
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

    return new UserDTO(newUser);
  }
}
