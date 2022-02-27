import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DistortionConverterComponent } from './distortion-converter/distortion-converter.component';
import { EqualizerFilterCalculatorComponent } from './equalizer-filter-calculator/equalizer-filter-calculator.component';
import { FrequencyBandsComponent } from './frequency-bands/frequency-bands.component';
import { PPICalculatorComponent } from './ppi-calculator/ppi-calculator.component';
import { VideoFileSizeCalculatorComponent } from './video-file-size-calculator/video-file-size-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DistortionConverterComponent,
    EqualizerFilterCalculatorComponent,
    FrequencyBandsComponent,
    PPICalculatorComponent,
    VideoFileSizeCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
