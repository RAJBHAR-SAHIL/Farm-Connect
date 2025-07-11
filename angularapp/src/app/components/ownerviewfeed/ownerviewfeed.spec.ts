import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ownerviewfeed } from './ownerviewfeed';

describe('Ownerviewfeed', () => {
  let component: Ownerviewfeed;
  let fixture: ComponentFixture<Ownerviewfeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ownerviewfeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ownerviewfeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
