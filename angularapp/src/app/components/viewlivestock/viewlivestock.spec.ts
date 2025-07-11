import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewlivestock } from './viewlivestock';

describe('Viewlivestock', () => {
  let component: Viewlivestock;
  let fixture: ComponentFixture<Viewlivestock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewlivestock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewlivestock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
