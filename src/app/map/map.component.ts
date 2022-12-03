import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { ReportsService } from '../reports.service';
import { Location } from '../reports.service';

const access_token = "pk.eyJ1IjoiYnJpYW5yYWhhZGkiLCJhIjoiY2xhejBxcTE2MHN4YjNwcHV2cWl3MjU3NSJ9.oAMJndUzpnAQaxxIJ18Epg";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements AfterViewInit {
  private map;

  constructor(private router: Router, private rs: ReportsService) { }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [49.25, -123],
      zoom: 11
    }).addEventListener('click', e => {
      let locationName = prompt(`Location Information ${e.latlng} \n What location name do you want to name?`)
      while (locationName.trim() == "") {
        
      }
      if (locationName.trim() == "") {
        alert("Location name cannot be empty string");
        return;
      }
      this.rs.getLocations().subscribe((data: any) => {
        console.log(data);
        let locations = data.data;
        locations[locationName] = [e.latlng.lat, e.latlng.lng]
        this.rs.putLocations(locations).subscribe(() => {
          this.router.navigate["/"]
        })
      }) 

    });

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`, {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
    this.rs.getLocations().subscribe(
      (data: any) => {
        let locsCount = {}

        let locations = data.data;

        let locationNames = Object.keys(locations);
        locationNames.forEach( loc => locsCount[loc] = 0);

        this.rs.getReports().subscribe(
          (data: any) => {
            let reports = data.data;
            reports.forEach( rep => locsCount[rep.location] += 1);

            for (let i = 0; i < locationNames.length; i++) {
                let currLoc = locationNames[i];
                L.marker(locations[locationNames[i]]).addTo(this.map).bindPopup(`<b>${currLoc}</b><br /> ${locsCount[currLoc]} cases reported`).openPopup();
            }
          }
        )

      }
    )
  }


}