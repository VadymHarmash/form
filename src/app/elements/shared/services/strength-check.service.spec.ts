import { TestBed } from '@angular/core/testing';

import { StrengthCheckService } from './strength-check.service';

describe('StrengthCheckService', () => {
  let service: StrengthCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrengthCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
