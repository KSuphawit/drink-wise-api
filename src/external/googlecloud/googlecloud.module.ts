import GooglePlacesService from '@/external/googlecloud/services/googleplces.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export default class GoogleCloudModule {}
