import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pig-report',
  templateUrl: './pig-report.component.html',
  styleUrls: ['./pig-report.component.css']
})

export class PigReportComponent implements OnInit {
  @Input('person')  person: string;
  @Input('phoneNum') phoneNum: number;
  @Input('pigBreed') pigBreed: string;
  @Input('location') location: [string];
  @Input('notes') notes: string;
  @Input('dateTime') date: Date;
  @Input('status') status: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
