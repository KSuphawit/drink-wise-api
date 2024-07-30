import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class AuthConfiguration {
  @IsNotEmpty()
  @Value('JWT_SECRET')
  jwtSecret: string;

  @Value('AUTH_EXPIRE_DURATION')
  expireDuration: string = '1d';
}
