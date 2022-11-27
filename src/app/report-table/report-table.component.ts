import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PigReportComponent } from '../pig-report/pig-report.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ReportsService } from '../reports.service';

export interface PigReport {
  name: string;
  phoneNum: number;
  pigBreed: string;
  location: [string];
  notes: string;
  date: Date;
  status: string;
}

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements AfterViewInit {
  headerTitle: string[] = ['location', 'name', 'reportedDateTime', 'status', 'info', 'delete'];
  reports = new MatTableDataSource(this.rs.get());

  constructor(private rs: ReportsService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.reports.sort = this.sort;
  }

}
