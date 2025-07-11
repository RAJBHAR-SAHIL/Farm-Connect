import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminviewfeedback } from './adminviewfeedback';

describe('Adminviewfeedback', () => {
  let component: Adminviewfeedback;
  let fixture: ComponentFixture<Adminviewfeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminviewfeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminviewfeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
