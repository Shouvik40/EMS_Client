import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { GradeMasterComponent } from './components/grade-master/grade-master.component';
import { UserMasterComponent } from './components/user-master/user-master.component';

import { ReadDepartmentComponent } from './components/Department/forms/read-department/read-department.component';
import { DashboardComponent } from './components/Employee/forms/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'department',
        component: DepartmentComponent,
        children: [
          { path: 'read', component: ReadDepartmentComponent },
          {
            path: '',
            redirectTo: 'read',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        children: [
          { path: 'read', component: DashboardComponent },
          { path: '', redirectTo: 'read', pathMatch: 'full' },
        ],
      },
      { path: 'grademaster', component: GradeMasterComponent },
      { path: 'usermaster', component: UserMasterComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
