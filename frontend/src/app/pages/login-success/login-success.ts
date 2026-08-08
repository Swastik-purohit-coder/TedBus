import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login-success',
  standalone: true,
  templateUrl: './login-success.html'
})
export class LoginSuccessComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {

      this.authService.setSession(token);

      this.profileService.getProfile().subscribe({
        next: (response: any) => {
          if (response && response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          window.location.href = '/profile';
        },
        error: () => {
          window.location.href = '/profile';
        }
      });

    } else {

      this.router.navigate(['/']);

    }

  }

}