// https://developers.google.com/maps/documentation/places/web-service/place-types#table-a
export enum PlaceTypes {
  Bar = 'bar',
}

export enum FieldMask {
  DisplayName = 'places.displayName',
  BusinessStatus = 'places.businessStatus',
  CurrentOpeningHours = 'places.currentOpeningHours',
  ServesBeer = 'places.servesBeer',
  ServesCocktails = 'places.servesCocktails',
  ServesWine = 'places.servesWine',
  UtcOffsetMinutes = 'places.utcOffsetMinutes',
}

class Coordinate {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}
}

class Circle {
  constructor(
    public center: Coordinate,
    public radius: number,
  ) {}
}

class LocationRestriction {
  constructor(public circle: Circle) {}
}

class NearbySearchPayload {
  constructor(
    public includedTypes: PlaceTypes[],
    public maxResultCount: number,
    public locationRestriction: LocationRestriction,
  ) {}
}

// https://developers.google.com/maps/documentation/places/web-service/nearby-search
export class NearbySearchRequest {
  constructor(
    public fieldMask: FieldMask[],
    public payload: NearbySearchPayload,
  ) {}

  static builder(): NearbySearchRequest {
    const defaultCoordinate = new Coordinate(0, 0);
    const defaultCircle = new Circle(defaultCoordinate, 0);
    const defaultLocationRestriction = new LocationRestriction(defaultCircle);
    const defaultPayload = new NearbySearchPayload(
      [],
      0,
      defaultLocationRestriction,
    );

    return new NearbySearchRequest([], defaultPayload);
  }

  setFieldMask(fieldMask: FieldMask[]): NearbySearchRequest {
    this.fieldMask = fieldMask;
    return this;
  }

  setIncludedTypes(types: PlaceTypes[]): NearbySearchRequest {
    this.payload.includedTypes = types;
    return this;
  }

  setMaxResultCount(maxResultCount: number): NearbySearchRequest {
    this.payload.maxResultCount = maxResultCount;
    return this;
  }

  setLatitude(latitude: number): NearbySearchRequest {
    this.payload.locationRestriction.circle.center.latitude = latitude;
    return this;
  }

  setLongitude(longitude: number): NearbySearchRequest {
    this.payload.locationRestriction.circle.center.longitude = longitude;
    return this;
  }

  setRadius(radius: number): NearbySearchRequest {
    this.payload.locationRestriction.circle.radius = radius;
    return this;
  }
}
