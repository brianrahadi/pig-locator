import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PigReportComponent } from '../pig-report/pig-report.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ReportsService } from '../reports.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements OnInit {
  headerTitle: string[] = ['location', 'name', 'reportedDateTime', 'status', 'info', 'delete'];
  reports;
  display: boolean;

  appKey = "P1XsZ7lIRH";
  collection = "pig-locator";
  
  constructor(private rs: ReportsService, private http: HttpClient) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.rs.getReports().subscribe((data:any)=>{
      console.log(data);
      this.reports = new MatTableDataSource(data.data);
      this.reports.sort = this.sort;
    })
  }

  onInfo(e: Event, id: number) {
    console.log(e);
    console.log(id);
    this.display = true;
  }

}
