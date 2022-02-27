import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-equalizer-filter-calculator',
  templateUrl: './equalizer-filter-calculator.component.html',
  styleUrls: ['./equalizer-filter-calculator.component.css']
})
export class EqualizerFilterCalculatorComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Equalizer Filter Calculator - Empty Vault");
    this.metaTagService.addTags([
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Calculate the quality factor that sets an equalizer filter to span across a desired frequency band. Includes center frequency calculation." },
      { name: "keywords", content: "equalizer filter calculator, equalizer calculator, eq filter calculator, eq calculator, q factor calculator, center frequency calculator" }
    ]);
    this.setPlaceholders();
    this.setOutputVisbility(["invisible"], []);
  }

  placeholder1: any;
  placeholder2: any;

  // Set calculation placeholders
  setPlaceholders() {
    let radios = document.getElementsByName("calculation-inputs");
    for (let i = 0; i < radios.length; i++) {
      let radio = radios[i] as HTMLInputElement;
      if (radio.checked) {
        if (radio.id == "center_bandwidth") {
          this.placeholder1 = "center frequency";
          this.placeholder2 = "bandwidth";
        }
        else if (radio.id == "lower_upper") {
          this.placeholder1 = "lower frequency";
          this.placeholder2 = "upper frequency";
        }
      }
    }
  }

  // Clear inputs and calculations on switch of input set
  switch() {
    let input1_value = (<HTMLInputElement> document.getElementById('input1'))!.value = '';
    let input2_value = (<HTMLInputElement> document.getElementById('input2'))!.value = '';
    this.calculate(input1_value, input2_value);
    this.placeholder1 = null;
    this.placeholder2 = null;
    document.getElementById("input1")!.classList.add("fade-change");
    document.getElementById("input2")!.classList.add("fade-change");
    this.setPlaceholders();
    setTimeout(() => {
      document.getElementById("input1")!.classList.remove("fade-change");
      document.getElementById("input2")!.classList.remove("fade-change");
    }, 500);
  }

  // Set visibility of outputs
  setOutputVisbility(add_classes: string[], remove_classes: string[]) {
    let outputs = document.getElementsByClassName("output");
    for (let i = 0; i < outputs.length; i++) {
      let output = outputs[i] as HTMLInputElement;
      for (let j = 0; j < add_classes.length; j++) {
        output.classList.add(add_classes[j]);
      }
      for (let j = 0; j < remove_classes.length; j++) {
        output.classList.remove(remove_classes[j]);
      }
    }
  }

  q_factor: any;
  freq1: any;
  freq2: any;
  q_factor_addon: any;
  freq1_addon: any;
  freq2_addon: any;

  // Equalizer filter calculation
  calculate(input1_str: string, input2_str: string) {
    let input1 = parseInt(input1_str);
    let input2 = parseInt(input2_str);
    let valid = false;

    this.q_factor = null;
    this.freq1 = null;
    this.freq2 = null;
    this.q_factor_addon = null;
    this.freq1_addon = null;
    this.freq2_addon = null;

    if (input1_str != "" && input2_str != "" && input1 > 0 && input2 > 0) {
      let radios = document.getElementsByName("calculation-inputs");
      for (let i = 0; i < radios.length; i++) {
        let radio = radios[i] as HTMLInputElement;
        if (radio.checked) {
          if (radio.id == "center_bandwidth") {
            document.getElementById("q-factor")!.classList.add("fade-change");
            document.getElementById("freq1")!.classList.add("fade-change");
            document.getElementById("freq2")!.classList.add("fade-change");

            this.q_factor = (input1/input2).toFixed(2);
            this.q_factor_addon = "Q Factor";
            let lower_freq = Math.round(input1 * (Math.sqrt(1 + (1/(4 * Math.pow(this.q_factor, 2)))) - (1/(2 * this.q_factor))));
            let upper_freq = Math.round(input1 * (Math.sqrt(1 + (1/(4 * Math.pow(this.q_factor, 2)))) + (1/(2 * this.q_factor))));
            if (lower_freq <= 0) {
              this.q_factor = null;
              this.freq1 = null;
              this.freq2 = null;
            }
            else if (lower_freq > 0) {
              this.freq1 = lower_freq + " Hz";
              this.freq2 = upper_freq + " Hz";
              this.freq1_addon = "Lower";
              this.freq2_addon = "Upper";

              setTimeout(() => {
                document.getElementById("q-factor")!.classList.remove("fade-change");
                document.getElementById("freq1")!.classList.remove("fade-change");
                document.getElementById("freq2")!.classList.remove("fade-change");
              }, 500);

              this.setOutputVisbility(["fade-in"], ["invisible", "fade-out"]);
              valid = true;
            }
          }
          else if (radio.id == "lower_upper" && input2 > input1) {
            document.getElementById("q-factor")!.classList.add("fade-change");
            document.getElementById("freq1")!.classList.add("fade-change");
            document.getElementById("freq2")!.classList.add("fade-change");

            let center_freq = Math.round(Math.sqrt(input1 * input2));
            this.q_factor = (center_freq/(input2 - input1)).toFixed(2);
            this.q_factor_addon = "Q Factor";
            this.freq1 = center_freq + " Hz";
            this.freq1_addon = "Center"
            this.freq2 = (input2 - input1) + " Hz";
            this.freq2_addon = "Bandwidth";

            setTimeout(() => {
              document.getElementById("q-factor")!.classList.remove("fade-change");
              document.getElementById("freq1")!.classList.remove("fade-change");
              document.getElementById("freq2")!.classList.remove("fade-change");
            }, 500);

            this.setOutputVisbility(["fade-in"], ["invisible", "fade-out"]);
            valid = true;
          }
        }
      }
    }
    if (!valid) {
      this.setOutputVisbility(["fade-out"], ["fade-in"]);
      setTimeout(() => {
        this.setOutputVisbility(["invisible"], []);
      }, 500);
    }
  }
}
