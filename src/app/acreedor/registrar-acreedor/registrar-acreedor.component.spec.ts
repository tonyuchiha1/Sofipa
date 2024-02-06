import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAcreedorComponent } from './registrar-acreedor.component';

describe('RegistrarAcreedorComponent', () => {
  let component: RegistrarAcreedorComponent;
  let fixture: ComponentFixture<RegistrarAcreedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarAcreedorComponent]
    });
    fixture = TestBed.createComponent(RegistrarAcreedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
