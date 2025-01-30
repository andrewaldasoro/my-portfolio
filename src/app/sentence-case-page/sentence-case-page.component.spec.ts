import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { SentenceCasePageComponent } from "./sentence-case-page.component";

describe("NotFoundComponent", () => {
	let component: SentenceCasePageComponent;
	let fixture: ComponentFixture<SentenceCasePageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SentenceCasePageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SentenceCasePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
