import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suppliereditmedicine } from './suppliereditmedicine';

describe('Suppliereditmedicine', () => {
  let component: Suppliereditmedicine;
  let fixture: ComponentFixture<Suppliereditmedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Suppliereditmedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Suppliereditmedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
