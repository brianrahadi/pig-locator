import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface InfoDialogText {
  title: string,
  body: string
}

export interface PigReport {
  id: number;
  reporterName: string;
  reporterPhoneNum: number;
  pigId: number;
  pigBreed: string;
  location: string;
  notes: string;
  dateTime: string;
  status: string;
}

export interface Location {
  name: string,
  lat: number,
  lng: number
};


@Injectable({
  providedIn: 'root'
})
export class ReportsService implements OnInit {
  appKey = "P1XsZ7lIRH";
  collection = "pig-locator"
  apiURL = `https://272.selfip.net/apps/${this.appKey}/collections/${this.collection}/documents/`;

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    // this.initialize(); 
  }

  getReports() : Observable<PigReport[]> {
    return this.http.get<PigReport[]>(`${this.apiURL}/reports`);
  }

  putReports(reports: PigReport[]) : Observable<any> {
    return this.http.put(`${this.apiURL}/reports`, {"key": "reports", "data": reports}, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
  }

  // not used
  // deleteReports() : Observable<any> {
  //   return this.http.delete(`${this.apiURL}/reports`);
  // }

  getLocations() : Observable<Object>{
    return this.http.get<Object>(`${this.apiURL}/locations`);
  }

  putLocations(locations: any[]) : Observable<Object> {
    return this.http.put(`${this.apiURL}/locations`, {"key": "locations", "data": locations}, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
  }

  hashPassword(password: string) : Observable<Object> {
    return this.http.get<Object>(`https://api.hashify.net/hash/md5/hex?value=${password}`);
  }
  // getLatLng(location: string) {
  //   return this.locations[location];
  // }

  // getLocationsCount() {
    // let locsCount = {}
    // Object.keys(this.locations).forEach( loc => locsCount[loc] = 0);
    // this.reports.forEach( rep => locsCount[rep.location] += 1);
    // return locsCount;
  // }

  

}
