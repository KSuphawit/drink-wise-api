import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class VerifyEmailRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  referenceCode: string;
}
