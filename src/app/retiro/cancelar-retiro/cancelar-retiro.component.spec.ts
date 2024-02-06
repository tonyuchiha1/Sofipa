import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarRetiroComponent } from './cancelar-retiro.component';

describe('CancelarRetiroComponent', () => {
  let component: CancelarRetiroComponent;
  let fixture: ComponentFixture<CancelarRetiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelarRetiroComponent]
    });
    fixture = TestBed.createComponent(CancelarRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
