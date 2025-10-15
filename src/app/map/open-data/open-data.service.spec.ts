import { provideHttpClient, withFetch } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { OpenDataService } from "./open-data.service";

describe("OpenDataService", () => {
  let service: OpenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenDataService, provideHttpClient(withFetch())],
    });
    service = TestBed.inject(OpenDataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
