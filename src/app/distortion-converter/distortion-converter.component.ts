import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { appName } from '../app.component';

declare let $: any;

@Component({
  selector: 'app-distortion-converter',
  templateUrl: './distortion-converter.component.html',
  styleUrls: ['./distortion-converter.component.css']
})
export class DistortionConverterComponent implements OnInit {

  componentName: String = "Distortion Converter";
  
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.componentName} | ${appName}`);
  }

  convertDB(attenuation_str: string): void {
    $("#factorInput").val("");
    $("#warning").html("");

    if (!this.isNumber(attenuation_str)) return;
    let attenuation_num: number = parseInt(attenuation_str);

    if (attenuation_num <= 0) {
      
      let factor: string = (Math.pow(10, (attenuation_num) / 20) * 100).toFixed(5);
      
      if (parseFloat(factor) >= 1)
        factor = parseFloat(factor).toPrecision(5);

      if (parseFloat(factor) == 0)
        $("#factorInput").val("~0");
      else
        $("#factorInput").val(factor)
    }
    else {
      $("#warning").html("decibel input must be negative");
    }
  }

  convertPercent(factor_str: string): void {
    $("#attenuationInput").val("");
    $("#warning").html("");

    if (!this.isNumber(factor_str)) return;
    let factor_num: number = parseFloat(factor_str);
    
    if (factor_num > 0 && factor_num <= 100) {

      let attenuation: number = Math.round(20 * Math.log10(factor_num / 100));

      if (attenuation == 0 && factor_num < 100)
        $("#attenuationInput").val("~0");
      else
        $("#attenuationInput").val(attenuation);
    }
    else if (factor_num <= 0)
      $("#warning").html("percent must be positive");
    else if (factor_num > 100)
      $("#warning").html("percent must not exceed 100");
  }

  reset(): void {
    $("#attenuationInput").val("");
    $("#factorInput").val("");
    $("#warning").html("");
  }

  isNumber(string: string): boolean {
    return (!isNaN(Number(string)) && string != "" && !string.includes(" "));
  }
}
