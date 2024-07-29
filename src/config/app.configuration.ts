import { Environment } from '@/common/enums/environment.enum';
import { Configuration, Value } from '@itgorillaz/configify';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

@Configuration()
export class AppConfiguration {
  @IsEnum(Environment)
  @Value('APP_ENV')
  env: string;

  @Value('APP_NAME')
  name: string;

  @IsNotEmpty()
  @Value('APP_HOST')
  host: string;

  @IsNotEmpty()
  @IsInt()
  @Value('APP_PORT', {
    parse: (value: any) => parseInt(value),
  })
  port: number;
}
