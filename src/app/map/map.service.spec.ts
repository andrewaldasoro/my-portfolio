import { provideHttpClient, withFetch } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ConfigurationService } from "../configuration.service";
import { MapService } from "./map.service";
import { OpenDataService } from "./open-data/open-data.service";
import { TorontoNeighbourhoodsService } from "./toronto-neighbourhoods.service";

describe("MapService", () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService,
        ConfigurationService,
        TorontoNeighbourhoodsService,
        OpenDataService,
        provideHttpClient(withFetch()),
      ],
    });
    service = TestBed.inject(MapService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
