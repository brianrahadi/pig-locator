import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reports = [
    {
      name: "Bobby",
      phoneNum: 2365912034,
      pigBreed: "Lavender",
      location: [49.2276, -123.0076],
      notes: 'Hehe',
      dateTime: new Date(),
      status: 'retrieved'
    },
    {
      name: "Sarah",
      phoneNum: 2365913023,
      pigBreed: "Greyrat",
      location: [49.2276, -123.0076],
      notes: 'Haha',
      dateTime: new Date(),
      status: 'retrieved'
    }
  ]
  constructor() { }

  get(){
    return this.reports
  }

  add(report){
    // person.added_on = (new Date()).getTime()
    // this.people.push(person)
    // console.log(this.people)
  }

  delete(del_person:string){
    // this.people = this.people.filter(p=>p.name!==del_person)
    // console.log(this.people)
    // return this.people
  }}
