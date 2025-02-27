import { TestBed } from "@angular/core/testing";

import { BackgroundDotsEffectsService } from "./background-dots-effects.service";

describe("BackgroundEffectsService", () => {
	let service: BackgroundDotsEffectsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BackgroundDotsEffectsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
