import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-ppi-calculator',
  templateUrl: './ppi-calculator.component.html',
  styleUrls: ['./ppi-calculator.component.css']
})
export class PPICalculatorComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("PPI Calculator - Empty Vault");
    this.metaTagService.addTags([
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Calculate the pixels per inch of a display." },
      { name: "keywords", content: "ppi calculator, pixels per inch calculator" }
    ]);
    this.setOutputVisbility(["invisible"], []);
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

  ppi: any;
  ppi_addon: any;

  // Calculate PPI
  calculate(px_width_str: string, px_height_str: string, screen_size_str: string) {
    let px_width = parseInt(px_width_str);
    let px_height = parseInt(px_height_str);
    let screen_size  = parseFloat(screen_size_str);

    this.ppi = null;
    this.ppi_addon = null;

    if (px_width > 0 && px_height > 0 && screen_size > 0) {
      document.getElementById("ppi")!.classList.add("fade-change");

      let px_diagonal = Math.sqrt(Math.pow(px_width, 2) + Math.pow(px_height, 2));
      this.ppi = (px_diagonal/screen_size).toFixed(2);
      this.ppi_addon = "PPI";

      setTimeout(() => {
        document.getElementById("ppi")!.classList.remove("fade-change");
      }, 500);

      this.setOutputVisbility(["fade-in"], ["invisible", "fade-out"]);
    }
    else {
      this.setOutputVisbility(["fade-out"], ["fade-in"]);
      setTimeout(() => {
        this.setOutputVisbility(["invisible"], []);
      }, 500);
    }
  }

  // Reset fields
  reset() {
    this.ppi = null;
    this.ppi_addon = null;

    (<HTMLInputElement> document.getElementById("px-width"))!.value = "";
    (<HTMLInputElement> document.getElementById("px-height"))!.value = "";
    (<HTMLInputElement> document.getElementById("screen-size"))!.value = "";

    this.setOutputVisbility(["fade-out"], ["fade-in"]);
    setTimeout(() => {
      this.setOutputVisbility(["invisible"], []);
    }, 500);
  }
}
