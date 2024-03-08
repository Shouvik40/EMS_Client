import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LocalStorageService } from '../storage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(userData: any) {
    console.log(userData); // For debugging

    // Make HTTP request to the server to authenticate the user
    // Assuming 'userData' contains the necessary login information
    return this.http
      .post<any>('https://localhost:7133/api/Login', userData)
      .pipe(
        map((response) => {
          // Assuming the response contains user data including userType
          this.localStorageService.setItem(
            'currentUser',
            JSON.stringify(response)
          );
          return response;
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }

  logout() {
    // Perform logout logic here (e.g., clear session storage, navigate to login page)
    // For example, clear any stored user data and navigate to the login page
    this.localStorageService.removeItem('currentUser');
  }

  getCurrentUser(): any {
    // Retrieve user from local storage
    return JSON.parse(this.localStorageService.getItem('currentUser') || '{}');
  }
}
