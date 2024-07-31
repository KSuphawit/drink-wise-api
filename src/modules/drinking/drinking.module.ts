import { GooglePlacesService } from '@/external/google-cloud/google-plces.service';
import { DrinkingController } from '@/modules/drinking/drinking.controller';
import { DrinkingService } from '@/modules/drinking/drinking.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DrinkingController],
  providers: [DrinkingService, GooglePlacesService],
})
export default class DrinkingModule {}
