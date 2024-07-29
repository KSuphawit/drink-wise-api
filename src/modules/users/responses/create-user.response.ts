import { UserDTO } from '@/modules/users/dto/user.dto';

export class CreateUserResponse {
  id: string;
  email: string;
  name: string;

  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.email = dto.email;
    this.name = dto.name;
  }
}
