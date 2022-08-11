import { TestBed } from '@angular/core/testing';

import { ObjectSerializationService } from './object-serialization.service';

describe('ObjectSerializationService', () => {
  let service: ObjectSerializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectSerializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
