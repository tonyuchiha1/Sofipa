import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRetiroComponent } from './registrar-retiro.component';

describe('RegistrarRetiroComponent', () => {
  let component: RegistrarRetiroComponent;
  let fixture: ComponentFixture<RegistrarRetiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarRetiroComponent]
    });
    fixture = TestBed.createComponent(RegistrarRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
