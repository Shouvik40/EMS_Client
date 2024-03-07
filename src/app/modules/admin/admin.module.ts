import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { UserMasterComponent } from './components/user-master/user-master.component';
import { GradeMasterComponent } from './components/grade-master/grade-master.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { ReadDepartmentComponent } from './components/Department/forms/read-department/read-department.component';
import { DashboardComponent } from './components/Employee/forms/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DepartmentComponent,
    UserMasterComponent,
    GradeMasterComponent,
    EmployeeComponent,
    ReadDepartmentComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
