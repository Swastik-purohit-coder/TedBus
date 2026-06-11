import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  constructor(
    private router: Router
  ) {}

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  login() {

    window.location.href =
      'https://tedbus-backend-y1q4.onrender.com/api/auth/google';

  }

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.router.navigate(['/']);

  }

}