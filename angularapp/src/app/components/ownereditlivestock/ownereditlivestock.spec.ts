import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ownereditlivestock } from './ownereditlivestock';

describe('Ownereditlivestock', () => {
  let component: Ownereditlivestock;
  let fixture: ComponentFixture<Ownereditlivestock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ownereditlivestock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ownereditlivestock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
