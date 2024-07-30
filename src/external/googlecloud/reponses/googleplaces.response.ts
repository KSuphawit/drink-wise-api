// https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
export class NearbySearchResponse {
  places: NearbyPlace[];
}

export enum BussinessStatus {
  BUSINESS_STATUS_UNSPECIFIED = 'BUSINESS_STATUS_UNSPECIFIED',
  OPERATIONAL = 'OPERATIONAL',
  CLOSED_TEMPORARILY = 'CLOSED_TEMPORARILY',
  CLOSED_PERMANENTLY = 'CLOSED_PERMANENTLY',
}

export class NearbyPlace {
  businessStatus: BussinessStatus;
  utcOffsetMinutes: number;
  displayName: {
    text: string;
    languageCode: string;
  };
  currentOpeningHours: {
    openNow: boolean;
    periods: Period[];
    weekdayDescriptions: string[];
  };
  servesBeer: boolean;
  servesCocktails: boolean;
  servesWine: boolean;
}

class Period {
  open: {
    hour: number;
    minute: number;
    date: {
      year: number;
      month: number;
      day: number;
    };
  };

  close: {
    hour: number;
    minute: number;
    date: {
      year: number;
      month: number;
      day: number;
    };
  };
}
