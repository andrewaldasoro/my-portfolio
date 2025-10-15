import { provideHttpClient, withFetch } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ConfigurationService } from "./configuration.service";

const DEFAULT_CONFIG = {
  mapboxAccessToken: "test",
};

describe("ConfigurationService", () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load the configuration", () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const req = httpTesting.expectOne(
      "/assets/configuration.json",
      "Request to load the configuration",
    );

    expect(req.request.method).toBe("GET");

    expect(service.configuration()).toEqual({
      mapboxAccessToken: "",
    });
    expect(service.isConfigLoaded()).toBe(false);
    // Flushing the request causes it to complete, delivering the result.
    req.flush(DEFAULT_CONFIG);

    expect(service.configuration()).toEqual(DEFAULT_CONFIG);
    expect(service.isConfigLoaded()).toBe(true);

    // Finally, we can assert that no other requests were made.
    httpTesting.verify();
  });
});
