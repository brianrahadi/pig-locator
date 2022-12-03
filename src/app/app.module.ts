import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { AddPageComponent } from './add-page/add-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationPageComponent } from './location-page/location-page.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SetRetrievedDialogComponent } from './set-retrieved-dialog/set-retrieved-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportTableComponent,
    MapComponent,
    HomeComponent,
    AddPageComponent,
    LocationPageComponent,
    InfoDialogComponent,
    DeleteDialogComponent,
    SetRetrievedDialogComponent,
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
