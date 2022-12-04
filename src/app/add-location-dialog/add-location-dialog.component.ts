import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.css']
})
export class AddLocationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  addLocation(): void {
    // let locationName = prompt(`Location Information ${e.latlng} \n What location name do you want to name?`)
    //   while (locationName.trim() == "") {

    //   }
    //   if (locationName.trim() == "") {
    //     alert("Location name cannot be empty string");
    //     return;
    //   }
    //   this.rs.getLocations().subscribe((data: any) => {
    //     let locations = data.data;
    //     let locationNames = Object.keys(locations);
    //     let uniqueName = true;
    //     for (let name of locationNames) {
    //       if (name.toLocaleLowerCase().trim() == locationName.toLocaleLowerCase().trim()) {
    //         uniqueName = false;
    //       }
    //     }

    //     if (!uniqueName) {
    //       alert("Location not added because name is not unique!")
    //     } else {
    //       alert("LAH");
    //     }
  }
}
