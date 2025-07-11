import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Useraddfeedback } from './useraddfeedback';

describe('Useraddfeedback', () => {
  let component: Useraddfeedback;
  let fixture: ComponentFixture<Useraddfeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Useraddfeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Useraddfeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
