import { Component, OnInit } from '@angular/core';

import { audioComponentData, displayComponentData, videoComponentData } from '../app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  audioComponentData: any = audioComponentData;
  displayComponentData: any = displayComponentData;
  videoComponentData: any = videoComponentData;
  
  constructor() { }

  ngOnInit(): void {
  }
}
