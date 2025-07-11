import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewmedicine } from './viewmedicine';

describe('Viewmedicine', () => {
  let component: Viewmedicine;
  let fixture: ComponentFixture<Viewmedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewmedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewmedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
