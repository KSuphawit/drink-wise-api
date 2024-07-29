import { Configuration, Value } from '@itgorillaz/configify';
import { IsInt, IsNotEmpty } from 'class-validator';

@Configuration()
export class DatabaseConfiguration {
  @IsNotEmpty()
  @Value('DB_HOST')
  host: string;

  @IsNotEmpty()
  @IsInt()
  @Value('DB_PORT', {
    parse: (value: any) => parseInt(value),
  })
  port: number;

  @IsNotEmpty()
  @Value('DB_USERNAME')
  username: string;

  @IsNotEmpty()
  @Value('DB_PASSWORD')
  password: string;

  @IsNotEmpty()
  @Value('DB_NAME')
  databeseName: string;
}
