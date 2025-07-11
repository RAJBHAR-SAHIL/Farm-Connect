import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supplierrequests } from './supplierrequests';

describe('Supplierrequests', () => {
  let component: Supplierrequests;
  let fixture: ComponentFixture<Supplierrequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Supplierrequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supplierrequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
