import { TestBed } from '@angular/core/testing';

import { CountStepServiceService } from './count-step-service.service';

describe('CountStepServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountStepServiceService = TestBed.get(CountStepServiceService);
    expect(service).toBeTruthy();
  });
});
