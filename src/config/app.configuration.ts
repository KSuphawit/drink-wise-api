import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class AppConfiguration {
  @Value('APP_ENV')
  env: string;
  @Value('APP_NAME')
  name: string;
  @Value('APP_HOST')
  host: string;
  @Value('APP_PORT')
  port: number;
}
