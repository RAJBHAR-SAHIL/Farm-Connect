import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Requestform } from './requestform';

describe('Requestform', () => {
  let component: Requestform;
  let fixture: ComponentFixture<Requestform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Requestform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Requestform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
