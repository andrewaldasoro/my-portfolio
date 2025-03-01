import { TestBed } from "@angular/core/testing";

import { BackgroundEffectService } from "./background-effect.service";

describe("BackgroundEffectsService", () => {
	let service: BackgroundEffectService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BackgroundEffectService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
