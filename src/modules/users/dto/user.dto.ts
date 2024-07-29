import { User } from '@/modules/users/entities/user.entity';

export class UserDTO {
  id: string | null;
  email: string | null;
  password: string | null;
  name: string | null;
  isVerified: boolean | null;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.isVerified = user.isVerified;
  }
}
