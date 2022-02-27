import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-frequency-bands',
  templateUrl: './frequency-bands.component.html',
  styleUrls: ['./frequency-bands.component.css']
})
export class FrequencyBandsComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Frequency Bands | Empty Vault");
  }
}
