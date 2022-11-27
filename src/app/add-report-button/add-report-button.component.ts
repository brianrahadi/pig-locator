import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReportDialogComponent } from '../add-report-dialog/add-report-dialog.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-add-report-button',
  templateUrl: './add-report-button.component.html',
  styleUrls: ['./add-report-button.component.css']
})
export class AddReportButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(MapComponent, dialogConfig);
    // const dialogRef = this.dialog.open(AddReportDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}