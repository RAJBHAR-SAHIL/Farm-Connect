import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suppliereditfeed } from './suppliereditfeed';

describe('Suppliereditfeed', () => {
  let component: Suppliereditfeed;
  let fixture: ComponentFixture<Suppliereditfeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Suppliereditfeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Suppliereditfeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
