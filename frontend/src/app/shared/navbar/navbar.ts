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
      'http://localhost:5000/api/auth/google';

  }

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.router.navigate(['/']);

  }

}