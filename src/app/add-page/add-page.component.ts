import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { InfoDialogText, PigReport } from '../reports.service';
import { ReportsService } from '../reports.service';
import { Location } from '../reports.service';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {


  form: FormGroup
  locations: Location[]

  constructor(private rs: ReportsService, private router: Router, private http: HttpClient, private dialog: MatDialog) { 
    let formControls = {
      reporterName: new FormControl('',[
        Validators.required
      ]),
      reporterPhoneNum: new FormControl('',[
        Validators.required,
        this.reportValidator
      ]),
      pigId: new FormControl('',[
        Validators.required,
        this.reportValidator
      ]),
      pigBreed: new FormControl('',[
        Validators.required
      ]),
      location: new FormControl('',[
        Validators.required
      ]),
      notes: new FormControl('', []),
      dateTime: new FormControl('',[
        Validators.required
      ]),
    }
    // location, report, status to be handled

    this.form = new FormGroup(formControls, {validators: [this.reportValidator]})
    this.locations = []
  }
  reportValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get("reporterName");
    const pigId = +control.get("pigId");
    if (pigId < 0) {
      return { pigId_error: "pigId cannot be negative" }
    }
    const reporterPhoneNum = +control.get("reporterPhoneNum");
    if (reporterPhoneNum < 0) {
      return { reporterPhoneNum_error: "reporter phone number cannot be negative"}
    }
    return null;
  }

  

  ngOnInit(): void {
    // console.log(JSON.stringify(this.rs.getReports()));
    this.rs.getLocations().subscribe((data: any) => {
      let rawLocations = data.data;
      let locNames = Object.keys(rawLocations);
      this.locations = [];
      for (let i = 0; i < locNames.length; i++) {
        let newLoc: Location = { name: locNames[i], lat: rawLocations[locNames[i]][0], lng: rawLocations[locNames[i]][1]}
        this.locations.push(newLoc);
      }
    })
  }

  onSubmit(report: PigReport){
    if (new Date(report.dateTime) > new Date()) {
      let dialogText: InfoDialogText = 
      {title: `FAIL`, 
      body: `Error Date: report not submitted. Report has date and time that is in the future.`}
      this.dialog.open(InfoDialogComponent, {
        data: dialogText
      });
      return;
    }

    report.status = "Ready for pickup"
    report.dateTime = new Date(report.dateTime).toLocaleString();
    this.rs.getReports().subscribe((data:any) => {
      let reports: PigReport[] = data.data;

      
      for (let i = 0; i < reports.length; i++) {
        if (reports[i].pigId == report.pigId && reports[i].pigBreed != report.pigBreed) {
          let dialogText: InfoDialogText = 
          {title: `FAIL`, 
          body: `Error Pig Breed: report not submitted. Earlier report(s) have the same pig id with different pig breed!`}
          this.dialog.open(InfoDialogComponent, {
            data: dialogText
          });
          return;
        }
      }
      let currentId = 0;
      for (let i = 0; i < reports.length; i++) {
        if (reports[i].id > currentId) {
          currentId = reports[i].id;
        }
      }
      report.id = ++currentId;
      reports.push(report);
      this.rs.putReports(reports).subscribe(() => {
        this.router.navigate(["/"])
      });
    })
  }

}
