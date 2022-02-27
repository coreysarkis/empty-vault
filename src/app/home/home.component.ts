import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { appName } from '../app.component';
import { audioComponentData, displayComponentData, videoComponentData } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  audioComponentData: any = audioComponentData;
  displayComponentData: any = displayComponentData;
  videoComponentData: any = videoComponentData;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(appName);
  }
}
