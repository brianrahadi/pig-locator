import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { PigReportComponent } from './pig-report/pig-report.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { AddPageComponent } from './add-page/add-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TableExpandableRowsExample } from './expand-table/expand-table.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule } from './material/material.module';
import { InfoPageComponent } from './info-page/info-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationPageComponent } from './location-page/location-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ReportTableComponent,
    PigReportComponent,
    MapComponent,
    HomeComponent,
    AddPageComponent,
    TableExpandableRowsExample,
    InfoPageComponent,
    LocationPageComponent,
  ],
  // entryComponents: [AddReportDialogComponent, AddReportButtonComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    RoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
