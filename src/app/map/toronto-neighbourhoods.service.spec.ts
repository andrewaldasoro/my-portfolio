import { TestBed } from '@angular/core/testing';

import { TorontoNeighbourhoodsService } from './toronto-neighbourhoods.service';

describe('TorontoNeighbourhoodsService', () => {
  let service: TorontoNeighbourhoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorontoNeighbourhoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
