import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createlivestock } from './createlivestock';

describe('Createlivestock', () => {
  let component: Createlivestock;
  let fixture: ComponentFixture<Createlivestock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Createlivestock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createlivestock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
