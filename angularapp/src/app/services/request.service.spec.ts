import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(RequestService);
  });

  fit('frontend_should_create_request_service', () => {
    expect(service).toBeTruthy();
  });
});
