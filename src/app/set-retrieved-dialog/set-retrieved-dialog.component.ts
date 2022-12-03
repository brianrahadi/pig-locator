import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-set-retrieved-dialog',
  templateUrl: './set-retrieved-dialog.component.html',
  styleUrls: ['./set-retrieved-dialog.component.css']
})
export class SetRetrievedDialogComponent implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<SetRetrievedDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string
    ) { }
  
    ngOnInit(): void {
    }
  
  }