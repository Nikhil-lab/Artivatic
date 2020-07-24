import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationInfoComponent } from './location-info/location-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'artivatic'},
  {path:'artivatic', component:LocationInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
