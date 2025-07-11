import { TestBed } from '@angular/core/testing';

import { MedicineService } from './medicine.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedicineService', () => {
  let service: MedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],});
    service = TestBed.inject(MedicineService);
  });

  fit('frontend_should_create_medicine_service', () => {
    expect(service).toBeTruthy();
  });
});
