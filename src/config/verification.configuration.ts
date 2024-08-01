import { Configuration, Value } from '@itgorillaz/configify';
import { IsNumber, IsString } from 'class-validator';
import { ManipulateType } from 'dayjs';

@Configuration()
export class VerificationConfiguration {
  @IsNumber()
  @Value('VERIFICATION_EXPIRE_DURATION', {
    parse: (value: any) => parseInt(value),
  })
  expireDuration: number = 15;

  @IsString()
  @Value('VERIFICATION_EXPIRE_UNIT')
  expireUnit: ManipulateType = 'minute';
}
