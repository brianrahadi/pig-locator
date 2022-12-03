import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { PigReport, ReportsService } from '../reports.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements OnInit {
  headerTitle: string[] = ['location', 'name', 'reportedDateTime', 'status', 'info', 'delete'];
  reports;
  display: boolean;
  
  constructor(private rs: ReportsService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.rs.getReports().subscribe((data:any)=>{
      console.log(data);
      this.reports = new MatTableDataSource(data.data);
      this.reports.sort = this.sort;
    })
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
    
  }

}
