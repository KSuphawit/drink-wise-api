import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class GoogleCloudConfiguration {
  @IsNotEmpty()
  @Value('GOOGLE_PLACES_API_URL')
  placesApiUrl: string;

  @IsNotEmpty()
  @Value('GOOGLE_PLACES_API_KEY')
  placesApiKey: string;
}
