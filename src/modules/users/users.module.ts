import { UserController } from '@/modules/users/controller/users.controller';
import { User } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/services/users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
