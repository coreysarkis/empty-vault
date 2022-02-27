import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DistortionConverterComponent } from './distortion-converter/distortion-converter.component';
import { EqualizerFilterCalculatorComponent } from './equalizer-filter-calculator/equalizer-filter-calculator.component';
import { FrequencyBandsComponent } from './frequency-bands/frequency-bands.component';
import { PPICalculatorComponent } from './ppi-calculator/ppi-calculator.component';
import { VideoFileSizeCalculatorComponent } from './video-file-size-calculator/video-file-size-calculator.component';

const audioComponentData: any = [
  { get path() { return getPathName(this.name) }, name: 'Distortion Converter' },
  { get path() { return getPathName(this.name) }, name: 'Equalizer Filter Calculator' },
  { get path() { return getPathName(this.name) }, name: 'Frequency Bands' }
];

const displayComponentData: any = [
  { get path() { return getPathName(this.name) }, name: 'PPI Calculator' }
];

const videoComponentData: any = [
  { get path() { return getPathName(this.name) }, name: 'Video File Size Calculator' }
];

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: audioComponentData[0].path, component: DistortionConverterComponent },
  { path: audioComponentData[1].path, component: EqualizerFilterCalculatorComponent },
  { path: audioComponentData[2].path, component: FrequencyBandsComponent },

  { path: displayComponentData[0].path, component: PPICalculatorComponent },

  { path: videoComponentData[0].path, component: VideoFileSizeCalculatorComponent }
];

function getPathName(displayName: string): string {
  return /*displayName.toLowerCase().replaceAll(' ', '-')*/ '';
}

export { audioComponentData, displayComponentData, videoComponentData }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
