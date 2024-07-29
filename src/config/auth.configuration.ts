import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class AuthConfiguration {
  @IsNotEmpty()
  @Value('JWT_SECRET')
  jwtSecret: string;

  @IsNotEmpty()
  @Value('AUTH_EXPIRE_DURATION')
  expireDuration: string;
}
