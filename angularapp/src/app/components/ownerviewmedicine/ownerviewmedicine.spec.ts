import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ownerviewmedicine } from './ownerviewmedicine';

describe('Ownerviewmedicine', () => {
  let component: Ownerviewmedicine;
  let fixture: ComponentFixture<Ownerviewmedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ownerviewmedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ownerviewmedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
