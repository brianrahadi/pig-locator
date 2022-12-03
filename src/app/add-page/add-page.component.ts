import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PigReport } from '../reports.service';
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

  constructor(private rs: ReportsService, private router: Router, private http: HttpClient) { 
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
      alert("Error Date: report not submitted. Report has date and time that is in the future.")
      return;
    }

    report.status = "Ready for pickup"
    report.dateTime = new Date(report.dateTime).toLocaleString();
    this.rs.getReports().subscribe((data:any) => {
      let reports: PigReport[] = data.data;

      
      for (let i = 0; i < reports.length; i++) {
        if (reports[i].pigId == report.pigId && reports[i].status == 'Retrieved') {
          alert("Error already retrieved: report not submitted. Earlier report(s) have already set the pig status to retrieved");
          return;
        }
        if (reports[i].pigId == report.pigId && reports[i].pigBreed != report.pigBreed) {
          alert("Error Pig Breed: report not submitted. Earlier report(s) have the same pig id with different pig breed!")
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
