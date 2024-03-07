// app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Here we wrie the logic for the html code written in app.component.html eg
  // single page application
  // title = 'EMS_Client';
  // data = [];
  // constructor(private router: Router, private api: ApiService) {
  //   this.api.getData().subscribe((d: any) => {
  //     this.data = d;
  //   });
  // }
  // Method to navigate to the login page
  // navigateToLogin() {
  //   this.router.navigate(['/login']); // Navigate to the login page
  // }
}
