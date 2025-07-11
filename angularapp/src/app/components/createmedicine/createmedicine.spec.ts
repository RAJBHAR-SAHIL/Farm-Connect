import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createmedicine } from './createmedicine';

describe('Createmedicine', () => {
  let component: Createmedicine;
  let fixture: ComponentFixture<Createmedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Createmedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createmedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
