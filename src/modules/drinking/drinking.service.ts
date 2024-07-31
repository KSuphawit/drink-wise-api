import {
  FieldMask,
  NearbySearchRequest,
  PlaceTypes,
} from '@/external/google-cloud/requests/google-places.request';
import GooglePlacesService from '@/external/google-cloud/services/google-plces.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrinkingService {
  constructor(private readonly googlePlacesService: GooglePlacesService) {}

  async findNearDrinkingPlaces(latitude: number, longitude: number) {
    const request = NearbySearchRequest.builder()
      .setFieldMask([
        FieldMask.BusinessStatus,
        FieldMask.CurrentOpeningHours,
        FieldMask.DisplayName,
        FieldMask.ServesBeer,
        FieldMask.ServesCocktails,
        FieldMask.ServesWine,
        FieldMask.UtcOffsetMinutes,
      ])
      .setIncludedTypes([PlaceTypes.Bar])
      .setMaxResultCount(1)
      .setLatitude(latitude)
      .setLongitude(longitude)
      .setRadius(500);

    return this.googlePlacesService.serachNearBy(request);
  }
}
