import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl =
    `${environment.apiUrl}/auth`;

  constructor() {}

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  loginWithGoogle(): void {

    window.location.href =
      `${this.authUrl}/google`;

  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }

}