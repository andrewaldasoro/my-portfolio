import { provideHttpClient, withFetch } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { OpenDataService } from "./open-data/open-data.service";
import { TorontoNeighbourhoodsService } from "./toronto-neighbourhoods.service";

describe("TorontoNeighbourhoodsService", () => {
  let service: TorontoNeighbourhoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TorontoNeighbourhoodsService,
        OpenDataService,
        provideHttpClient(withFetch()),
      ],
    });
    service = TestBed.inject(TorontoNeighbourhoodsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
