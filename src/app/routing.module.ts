import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPageComponent } from './add-page/add-page.component';
import { LocationPageComponent } from './location-page/location-page.component';

const appRoutes:Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddPageComponent },
  { path: 'location', component: LocationPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
