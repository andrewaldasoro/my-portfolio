import { provideHttpClient, withFetch } from "@angular/common/http";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MapComponent } from "./map.component";
import { MapService } from "./map.service";
import { OpenDataService } from "./open-data/open-data.service";
import { TorontoNeighbourhoodsService } from "./toronto-neighbourhoods.service";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [
        MapService,
        TorontoNeighbourhoodsService,
        OpenDataService,
        provideHttpClient(withFetch()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
