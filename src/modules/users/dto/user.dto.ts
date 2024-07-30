import { Exclude } from 'class-transformer';

export class UserDTO {
  id?: string;
  email?: string;
  name?: string;
  isVerified?: boolean;

  @Exclude()
  password?: string;

  constructor(user) {
    if (user === undefined) return this;
    this.id = user?.id;
    this.email = user?.email;
    this.password = user?.password;
    this.name = user?.name;
    this.isVerified = user?.isVerified;
  }
}
