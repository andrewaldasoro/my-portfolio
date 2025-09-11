import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { RouterService } from "./router.service";

describe("RouterService", () => {
  let service: RouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
