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
        Validators.required
      ]),
      pigId: new FormControl('',[
        Validators.required
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
    const name = control.get("reporterName")
    // const instructor = control.get("instructor")
    // const valid_instr_names = ['bobby', 'john', 'sara']
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
    report.status = "Ready for pickup"
    report.dateTime = new Date(report.dateTime).toLocaleString();
    this.rs.getReports().subscribe((data:any) => {
      let reports: PigReport[] = data.data;
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
