import { TestBed } from '@angular/core/testing';

import { InvServicesService } from './inv-services.service';

describe('InvServicesService', () => {
  let service: InvServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
