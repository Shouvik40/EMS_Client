// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   userId: string;
//   password: string;

//   constructor() {
//     this.userId = '';
//     this.password = '';
//   }

//   submit() {
//     // Here you can implement your login logic
//     console.log('User ID:', this.userId);
//     console.log('Password:', this.password);
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName: string;
  password: string;
  userType: string;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = '';
    this.password = '';
    this.userType = 'NU'; // Default to 'NU' for User
  }

  submitFunction() {
    const userData = {
      userName: this.userName,
      password: this.password,
      userType: this.userType,
    };

    this.authService.login(userData).subscribe(
      (response: any) => {
        // console.log(response);
        if (userData.userType === 'SU') {
          // Check userType against 'SU' for Admin
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        // Handle login error
      }
    );
  }
}
