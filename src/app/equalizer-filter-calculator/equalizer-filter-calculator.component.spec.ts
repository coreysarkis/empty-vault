import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizerFilterCalculatorComponent } from './equalizer-filter-calculator.component';

describe('EqualizerFilterCalculatorComponent', () => {
  let component: EqualizerFilterCalculatorComponent;
  let fixture: ComponentFixture<EqualizerFilterCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqualizerFilterCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizerFilterCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
