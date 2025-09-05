import { provideHttpClient, withFetch } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ConfigurationService } from "./configuration.service";

describe("ConfigurationService", () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService, provideHttpClient(withFetch())],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
