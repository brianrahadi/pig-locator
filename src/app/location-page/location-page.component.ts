import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ReportsService } from '../reports.service';

const access_token = "pk.eyJ1IjoiYnJpYW5yYWhhZGkiLCJhIjoiY2xhejBxcTE2MHN4YjNwcHV2cWl3MjU3NSJ9.oAMJndUzpnAQaxxIJ18Epg";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent  {
  constructor() {}
}