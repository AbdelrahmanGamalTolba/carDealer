/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarServiceService } from './car-service.service';

describe('Service: CarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarServiceService]
    });
  });

  it('should ...', inject([CarServiceService], (service: CarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
