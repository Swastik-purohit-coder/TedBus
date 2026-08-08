import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  private sub?: Subscription;

  loggedIn = false;

  ngOnInit(): void {
    this.sub = this.authService.isLoggedIn$.subscribe(state => {
      this.loggedIn = state;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    this.authService.loginWithGoogle();
  }

  loginDemo() {
    this.authService.loginDemo().subscribe({
      next: (res: any) => {
        if (res.token) {
          this.authService.setSession(res.token, res.user);
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Demo login failed', err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}