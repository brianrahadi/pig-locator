import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { PigReport, ReportsService } from '../reports.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { SetRetrievedDialogComponent } from '../set-retrieved-dialog/set-retrieved-dialog.component';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements OnInit {
  headerTitle: string[] = ['location', 'name', 'reportedDateTime', 'status', 'info', 'delete'];
  reports;
  display: boolean;
  
  constructor(private router: Router, private rs: ReportsService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;

  rerender(): void {
    this.rs.getReports().subscribe((data:any)=>{
      this.reports = new MatTableDataSource(data.data);
      this.reports.sort = this.sort;
    })
  }
  ngOnInit(): void {
    this.rerender();
  }

  openInfoDialog(reportId: number) {
    this.rs.getReports().subscribe((data: any) => {
      let report: PigReport = data.data.filter(({ id }) => id == reportId)[0];
      this.dialog.open(InfoDialogComponent, {data: report});
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
              alert(`Report ID # ${reportId} is successfully deleted`)
              this.rerender();
            });
          })
        } else {
          alert("Wrong password! Report is not deleted.")
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
              alert(`Reports with Pig ID ${pigId} is/ are successfuly set to retrieved`)
              this.rerender();
            });
          })
        } else {
          alert("Wrong password! Reports are not updated!")
        }
      })
    })
  }

}
