import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TimesheetComponent } from './pages/timesheet/timesheet.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Time Management System' } },
  { path: 'time', component: TimesheetComponent, data: { title: 'Time Management' } },
  { path: 'ams', component: AttendanceComponent, data: { title: 'attendance Management' } },
  { path: 'home', component: HomeComponent, data: { title: 'TMS Home' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
