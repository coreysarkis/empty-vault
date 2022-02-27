import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistortionConverterComponent } from './distortion-converter.component';

describe('DistortionConverterComponent', () => {
  let component: DistortionConverterComponent;
  let fixture: ComponentFixture<DistortionConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistortionConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistortionConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
