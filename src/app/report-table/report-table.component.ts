import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { InfoDialogText, PigReport, ReportsService } from '../reports.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SetRetrievedDialogComponent } from '../set-retrieved-dialog/set-retrieved-dialog.component';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements OnInit {
  reports: PigReport[];
  sortArr: boolean[] = [false, false, false, false]; // index 0 location, 1 name, 2 date time, 3 status

  constructor(private rs: ReportsService, public dialog: MatDialog) {
  }

  @ViewChild(MatSort) sort: MatSort;

  rerender(): void {
    this.rs.getReports().subscribe((data:any)=>{
      this.reports = data.data;
      // this.reports.sort = this.sort;
    })
  }
  ngOnInit(): void {
    this.rerender();
  }

  openInfoDialog(reportId: number) {
    this.rs.getReports().subscribe((data: any) => {
      let report: PigReport = data.data.filter(({ id }) => id == reportId)[0];
      let dialogText: InfoDialogText = 
      {title: `Pig Report ID ${report.id}`, 
      body: `<p>Reporter Name: ${report.reporterName}</p>
      <p>Reporter Phone Number: ${report.reporterPhoneNum}</p>
      <p>Pig ID: ${report.pigId}</p>
      <p>Pig Breed: ${report.pigBreed}</p>
      <p>Location: ${report.location}</p>
      <p>Reported Date and Time: ${report.dateTime}</p>
      <p>Status: ${report.status}</p>
      <p>Notes: ${report.notes}</p>`}
      this.dialog.open(InfoDialogComponent, {
        data: dialogText
      });
    })
  }

  openDeleteDialog(reportId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: reportId
    })

    let hashedValue = "84892b91ef3bf9d216bbc6e88d74a77c";
    
    dialogRef.afterClosed().subscribe(result => {
 
      this.rs.hashPassword(result).subscribe((data: any) => {
        if (data.Digest == hashedValue) {
          this.rs.getReports().subscribe((data: any) => {
            let reports: PigReport[] = data.data;
            let filteredReports: PigReport[] = reports.filter(({ id }) => id != reportId)
            this.rs.putReports(filteredReports).subscribe(() => {
              let dialogText: InfoDialogText = 
              {title: `SUCCESS`, 
              body: `Report ID # ${reportId} is successfully deleted`}
              this.dialog.open(InfoDialogComponent, {
                data: dialogText
              });
              this.rerender();
            });
          })
        } else {
          let dialogText: InfoDialogText = 
          {title: `FAIL`, 
          body: `Report ID # ${reportId} is not deleted due to wrong password/ closed dialog`}
          this.dialog.open(InfoDialogComponent, {
            data: dialogText
          });
        }
      })
    })
    
  }

  openSetRetrievedDialog(pigId: number) {
    const dialogRef = this.dialog.open(SetRetrievedDialogComponent, {
      data: pigId
    })

    let hashedValue = "84892b91ef3bf9d216bbc6e88d74a77c";
    
    dialogRef.afterClosed().subscribe(result => {
      this.rs.hashPassword(result).subscribe((data: any) => {
        if (data.Digest == hashedValue) {
          this.rs.getReports().subscribe((data: any) => {
            let reports: PigReport[] = data.data;
            let filteredReports: PigReport[] = reports.map((report) => {
              if (report.pigId == pigId) {
                report.status = "Retrieved";
              }
              return report;
            })
            this.rs.putReports(filteredReports).subscribe(() => {
              let dialogText: InfoDialogText = 
              {title: `SUCCESS`, 
              body:`Reports with Pig ID ${pigId} is/ are successfully set to retrieved`}
              this.dialog.open(InfoDialogComponent, {
                data: dialogText
              });
              this.rerender();
            });
          })
        } else {
          let dialogText: InfoDialogText = 
          {title: `FAIL`, 
          body: `Reports with Pig ID ${pigId} is/ are NOT successfully set to retrieved due to wrong password or closed dialog`}
          this.dialog.open(InfoDialogComponent, {
            data: dialogText
          });
        }
      })
    })
  }

  sortTable(type: number): void {
    this.rs.getReports().subscribe((data:any) => {
      // index 0 location, 1 name, 2 date time, 3 status
      this.reports = data.data;
      this.reports.sort((repA, repB) => { 
        if (this.sortArr[type]) {
          let temp = repA;
          repA = repB;
          repB = temp;
        }
        switch (type) {
          case 0:
            return repA.location.localeCompare(repB.location)
          case 1:
            return repA.reporterName.localeCompare(repB.reporterName)
          case 2:
            return new Date(repA.dateTime).getTime() - new Date(repB.dateTime).getTime() ;
          default:
            return repA.status.localeCompare(repB.status)
        }
      })
      this.sortArr[type] = !this.sortArr[type];
      for (let i = 0; i < 4; i++) {
        if (i == type) continue;
        this.sortArr[i] = false;
      }
    })
  }


  

}
