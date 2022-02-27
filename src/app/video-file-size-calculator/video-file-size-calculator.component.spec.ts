import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFileSizeCalculatorComponent } from './video-file-size-calculator.component';

describe('VideoFileSizeCalculatorComponent', () => {
  let component: VideoFileSizeCalculatorComponent;
  let fixture: ComponentFixture<VideoFileSizeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFileSizeCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFileSizeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
