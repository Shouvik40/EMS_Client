import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
