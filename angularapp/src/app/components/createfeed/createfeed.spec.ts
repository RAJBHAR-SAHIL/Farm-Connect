import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createfeed } from './createfeed';

describe('Createfeed', () => {
  let component: Createfeed;
  let fixture: ComponentFixture<Createfeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Createfeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createfeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
