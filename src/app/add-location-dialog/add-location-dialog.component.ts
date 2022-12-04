import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import {
  InfoDialogText,
  Location as LocationInterface,
  ReportsService,
} from '../reports.service';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.css'],
})
export class AddLocationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationInterface,
    private dialog: MatDialog,
    private rs: ReportsService
  ) {}

  ngOnInit(): void {}

  addLocation(): void { 
    if (this.data.name.trim() == '') {
      let dialogText: InfoDialogText = {
        title: `FAIL`,
        body: `Error Location Name Empty: Location not added.`,
      };
      this.dialog.open(InfoDialogComponent, {
        data: dialogText,
      });
      return;
    }

    this.rs.getLocations().subscribe((data: any) => {
      let locations = data.data;
      let locationNames = Object.keys(locations);
      let uniqueName = true;
      for (let name of locationNames) {
        if (
          name.toLocaleLowerCase().trim() ==
          this.data.name.toLocaleLowerCase().trim()
        ) {
          uniqueName = false;
        }
      }
      if (!uniqueName) {
        let dialogText: InfoDialogText = {
          title: `FAIL`,
          body: `Error Location Name Not Unique: Location not added.`,
        };
        this.dialog.open(InfoDialogComponent, {
          data: dialogText,
        });
      } else {
        locations[this.data.name] = [this.data.lat, this.data.lng];
        this.rs.putLocations(locations).subscribe(() => {
          let dialogText: InfoDialogText = {
            title: `SUCCESS`,
            body: `Location ${this.data.name} added.`,
          };
          this.dialog.open(InfoDialogComponent, {
            data: dialogText,
          });
          this.dialogRef.close();
        });
      }
    });
  }
}
