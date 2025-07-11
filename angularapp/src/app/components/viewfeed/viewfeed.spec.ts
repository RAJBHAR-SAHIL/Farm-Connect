import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewfeed } from './viewfeed';

describe('Viewfeed', () => {
  let component: Viewfeed;
  let fixture: ComponentFixture<Viewfeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewfeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewfeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
