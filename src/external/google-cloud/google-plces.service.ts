import { GoogleCloudConfiguration } from '@/config/googlecloud.configuration';
import {
  NearbyPlace,
  NearbySearchResponse,
} from '@/external/google-cloud/dto/reponses/google-places.response';
import { NearbySearchRequest } from '@/external/google-cloud/dto/requests/google-places.request';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GooglePlacesService {
  private readonly API_URL: string;
  private readonly API_KEY: string;

  constructor(
    private readonly googleCloudConfig: GoogleCloudConfiguration,
    private readonly httpService: HttpService,
  ) {
    this.API_URL = this.googleCloudConfig.placesApiUrl;
    this.API_KEY = this.googleCloudConfig.placesApiKey;
  }

  async serachNearBy(request: NearbySearchRequest): Promise<NearbyPlace[]> {
    try {
      const observable = this.httpService.post<NearbySearchResponse>(
        this.API_URL,
        request.payload,
        {
          headers: {
            'X-Goog-Api-Key': this.API_KEY,
            'X-Goog-FieldMask': request.fieldMask.join(','),
          },
        },
      );

      const response =
        await lastValueFrom<AxiosResponse<NearbySearchResponse>>(observable);
      return response.data.places ?? [];
    } catch (error) {
      console.log(error);
    }
  }
}
