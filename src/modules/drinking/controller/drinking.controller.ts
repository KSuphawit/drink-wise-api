import { DrinkingService } from '@/modules/drinking/services/drinking.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('drinking')
export class DrinkingController {
  constructor(private readonly drinkingService: DrinkingService) {}

  @Get('nearby')
  async getNearDrinkingPlaces(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return await this.drinkingService.findNearDrinkingPlaces(
      latitude,
      longitude,
    );
  }
}
