import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userviewfeedback } from './userviewfeedback';

describe('Userviewfeedback', () => {
  let component: Userviewfeedback;
  let fixture: ComponentFixture<Userviewfeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Userviewfeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userviewfeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
