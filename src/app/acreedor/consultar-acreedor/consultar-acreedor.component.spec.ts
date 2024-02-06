import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAcreedorComponent } from './consultar-acreedor.component';

describe('ConsultarAcreedorComponent', () => {
  let component: ConsultarAcreedorComponent;
  let fixture: ComponentFixture<ConsultarAcreedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarAcreedorComponent]
    });
    fixture = TestBed.createComponent(ConsultarAcreedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
