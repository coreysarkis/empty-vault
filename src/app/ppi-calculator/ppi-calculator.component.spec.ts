import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpiCalculatorComponent } from './ppi-calculator.component';

describe('PpiCalculatorComponent', () => {
  let component: PpiCalculatorComponent;
  let fixture: ComponentFixture<PpiCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpiCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
