import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-video-file-size-calculator',
  templateUrl: './video-file-size-calculator.component.html',
  styleUrls: ['./video-file-size-calculator.component.css']
})
export class VideoFileSizeCalculatorComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Video File Size Calculator - Empty Vault");
    this.metaTagService.addTags([
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Calculate the size of a video file based on its resolution, bit depth, frame rate, and length. Supports calculation for compressed video." },
      { name: "keywords", content: "video file size calculator, video file calculator, video size calculator" }
    ]);
    this.compressionAccess();
    this.setOutputVisbility(["invisible"], []);
  }

  // Set accessible input fields based on compression checkbox
  compressionAccess() {
    let checkbox = document.getElementById("checkbox") as HTMLInputElement;
    if (checkbox.checked) {
      (<HTMLInputElement> document.getElementById("comp-bitrate"))!.disabled = false;
      (<HTMLInputElement> document.getElementById("comp-bitrate-unit"))!.disabled = false;
      (<HTMLInputElement> document.getElementById("px-width"))!.disabled = true;
      (<HTMLInputElement> document.getElementById("px-height"))!.disabled = true;
      (<HTMLInputElement> document.getElementById("bit-depth"))!.disabled = true;
      (<HTMLInputElement> document.getElementById("fps"))!.disabled = true;
      document.getElementById("bit-depth-addon")!.style.color = "#adb5bd";
      document.getElementById("fps-addon")!.style.color = "#adb5bd";
    }
    else {
      (<HTMLInputElement> document.getElementById("comp-bitrate"))!.disabled = true;
      (<HTMLInputElement> document.getElementById("comp-bitrate-unit"))!.disabled = true;
      (<HTMLInputElement> document.getElementById("px-width"))!.disabled = false;
      (<HTMLInputElement> document.getElementById("px-height"))!.disabled = false;
      (<HTMLInputElement> document.getElementById("bit-depth"))!.disabled = false;
      (<HTMLInputElement> document.getElementById("fps"))!.disabled = false;
      document.getElementById("bit-depth-addon")!.style.color = "#6c757d";
      document.getElementById("fps-addon")!.style.color = "#6c757d";
    }
    this.reset();
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

  // Calculates seconds
  calculateSeconds(hr: number, min: number, sec: number) {
    if (hr > 0) {
      min > 0 ? min += hr * 60 : min = hr * 60;
    }
    if (min > 0) {
      sec > 0 ? sec += min * 60 : sec = min * 60;
    }
    return sec;
  }

  // Calculate file size
  calculateFileSize(bitrate: number, sec: number) {
    this.file_size = (bitrate * sec)/8;
      this.file_size_unit = "B";
      if (this.file_size > 1000) {
        this.file_size = this.file_size/1000;
        this.file_size_unit = "KB";
        if (this.file_size > 1000) {
          this.file_size = this.file_size/1000;
          this.file_size_unit = "MB";
          if (this.file_size > 1000) {
            this.file_size = this.file_size/1000;
            this.file_size_unit = "GB";
            if (this.file_size > 1000) {
              this.file_size = this.file_size/1000;
              this.file_size_unit = "TB";
            }
          }
        }
      }
      if (this.file_size >= 100) {
        this.file_size = this.file_size.toFixed(0);
      }
      else if (this.file_size >= 10) {
        this.file_size = this.file_size.toFixed(1);
      }
      else {
        this.file_size = this.file_size.toFixed(2);
      }
      this.file_size_addon = "file size";
  }

  file_size: any;
  frame_size: any;
  bitrate: any;
  frame_size_unit: any;
  file_size_unit: any;
  bitrate_unit: any;
  pixels: any;
  frames: any;
  file_size_addon: any;
  frame_size_addon: any;
  bitrate_addon: any;
  pixels_addon: any;
  frames_addon: any;

  // Video file size, frame size, bitrate, pixels, frames calculations
  calculate(px_width_str: string, px_height_str: string, bit_depth_str: string, fps_str: string, hr_str: string, min_str: string, sec_str: string, comp_bitrate_str: string, comp_bitrate_unit_str: string) {
    let px_width = parseInt(px_width_str);
    let px_height = parseInt(px_height_str);
    let bit_depth = parseInt(bit_depth_str);
    let fps = parseInt(fps_str);
    let hr = parseInt(hr_str);
    let min = parseInt(min_str);
    let sec = parseInt(sec_str);
    let comp_bitrate = parseInt(comp_bitrate_str);

    this.file_size = null;
    this.frame_size = null;
    this.bitrate = null;
    this.file_size_unit = null;
    this.frame_size_unit = null;
    this.bitrate_unit = null;
    this.pixels = null;
    this.frames = null;
    this.file_size_addon = null;
    this.frame_size_addon = null;
    this.bitrate_addon = null;
    this.pixels_addon = null;
    this.frames_addon = null;

    if (px_width > 0 && px_height > 0 && bit_depth > 0 && fps > 0 && (hr > 0 || min > 0 || sec > 0)) {
      document.getElementById("file-size-col")!.classList.remove("col-md-6");
      document.getElementById("file-size-col")!.classList.add("col-md-4");

      document.getElementById("file-size")!.classList.add("fade-change");
      document.getElementById("frame-size")!.classList.add("fade-change");
      document.getElementById("bitrate")!.classList.add("fade-change");
      document.getElementById("pixels")!.classList.add("fade-change");
      document.getElementById("frames")!.classList.add("fade-change");
      
      sec = this.calculateSeconds(hr, min, sec);

      this.calculateFileSize((px_width * px_height * bit_depth * fps), sec);

      this.frame_size = (px_width * px_height * bit_depth)/8;
      this.frame_size_unit = "B";
      if (this.frame_size > 1000) {
        this.frame_size = this.frame_size/1000;
        this.frame_size_unit = "KB";
        if (this.frame_size > 1000) {
          this.frame_size = this.frame_size/1000;
          this.frame_size_unit = "MB";
          if (this.frame_size > 1000) {
            this.frame_size = this.frame_size/1000;
            this.frame_size_unit = "GB";
            if (this.frame_size > 1000) {
              this.frame_size = this.frame_size/1000;
              this.frame_size_unit = "TB";
            }
          }
        }
      }
      if (this.frame_size >= 100) {
        this.frame_size = this.frame_size.toFixed(0);
      }
      else if (this.frame_size >= 10) {
        this.frame_size = this.frame_size.toFixed(1);
      }
      else {
        this.frame_size = this.frame_size.toFixed(2);
      }
      this.frame_size_addon = "frame size";

      this.bitrate = px_width * px_height * bit_depth * fps;
      this.bitrate_unit = "b/s";
      if (this.bitrate > 1000) {
        this.bitrate = this.bitrate/1000;
        this.bitrate_unit = "Kb/s";
        if (this.bitrate > 1000) {
          this.bitrate = this.bitrate/1000;
          this.bitrate_unit = "Mb/s";
          if (this.bitrate > 1000) {
            this.bitrate = this.bitrate/1000;
            this.bitrate_unit = "Gb/s";
            if (this.bitrate > 1000) {
              this.bitrate = this.bitrate/1000;
              this.bitrate_unit = "Tb/s";
            }
          }
        }
      }
      if (this.bitrate >= 100) {
        this.bitrate = this.bitrate.toFixed(0);
      }
      else if (this.bitrate >= 10) {
        this.bitrate = this.bitrate.toFixed(1);
      }
      else {
        this.bitrate = this.bitrate.toFixed(2);
      }
      this.bitrate_addon = "bitrate";

      this.pixels = (px_width * px_height * fps * sec).toLocaleString();
      this.pixels_addon = "pixels";

      this.frames = (fps * sec).toLocaleString();
      this.frames_addon = "frames";

      setTimeout(() => {
        document.getElementById("file-size")!.classList.remove("fade-change");
        document.getElementById("frame-size")!.classList.remove("fade-change");
        document.getElementById("bitrate")!.classList.remove("fade-change");
        document.getElementById("pixels")!.classList.remove("fade-change");
        document.getElementById("frames")!.classList.remove("fade-change");
      }, 500);

      this.setOutputVisbility(["fade-in"], ["invisible", "fade-out"]);
    }
    else if (comp_bitrate > 0 && (hr > 0 || min > 0 || sec > 0)) {
      document.getElementById("file-size-col")!.classList.remove("col-md-4");
      document.getElementById("file-size-col")!.classList.add("col-md-6");

      document.getElementById("file-size")!.classList.add("fade-change");

      sec = this.calculateSeconds(hr, min, sec);

      comp_bitrate *= 1000000;
      if (comp_bitrate_unit_str == "Gb/s") {
        comp_bitrate *= 1000;
      }

      this.calculateFileSize(comp_bitrate, sec);

      setTimeout(() => {
        document.getElementById("file-size")!.classList.remove("fade-change");
      }, 500);

      let output = document.getElementsByClassName("output")[0] as HTMLInputElement;
      output.classList.add("fade-in");
      output.classList.remove("invisible");
      output.classList.remove("fade-out");
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
    this.file_size = null;
    this.frame_size = null;
    this.bitrate = null;
    this.file_size_unit = null;
    this.frame_size_unit = null;
    this.bitrate_unit = null;
    this.pixels = null;
    this.frames = null;
    this.file_size_addon = null;
    this.frame_size_addon = null;
    this.bitrate_addon = null;
    this.pixels_addon = null;
    this.frames_addon = null;

    (<HTMLInputElement> document.getElementById("px-width"))!.value = "";
    (<HTMLInputElement> document.getElementById("px-height"))!.value = "";
    (<HTMLInputElement> document.getElementById("bit-depth"))!.value = "";
    (<HTMLInputElement> document.getElementById("fps"))!.value = "";
    (<HTMLInputElement> document.getElementById("hr"))!.value = "";
    (<HTMLInputElement> document.getElementById("min"))!.value = "";
    (<HTMLInputElement> document.getElementById("sec"))!.value = "";
    (<HTMLInputElement> document.getElementById("comp-bitrate"))!.value = "";

    this.setOutputVisbility(["fade-out"], ["fade-in"]);
    setTimeout(() => {
      this.setOutputVisbility(["invisible"], []);
    }, 500);
  }
}
