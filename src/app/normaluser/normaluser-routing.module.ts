import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import path from 'path';
import { NormaluserdashboardComponent } from './normaluserdashboard/normaluserdashboard.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NormaluserRoutingModule {}
