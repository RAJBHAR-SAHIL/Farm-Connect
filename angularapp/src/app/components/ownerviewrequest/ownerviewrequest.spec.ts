import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ownerviewrequest } from './ownerviewrequest';

describe('Ownerviewrequest', () => {
  let component: Ownerviewrequest;
  let fixture: ComponentFixture<Ownerviewrequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ownerviewrequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ownerviewrequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
