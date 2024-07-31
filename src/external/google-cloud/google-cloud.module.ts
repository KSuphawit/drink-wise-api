import GooglePlacesService from '@/external/google-cloud/services/google-plces.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export default class GoogleCloudModule {}
