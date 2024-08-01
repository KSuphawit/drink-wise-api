import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerifiactionRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
