import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private authUrl = `${environment.apiUrl}/auth`;

  private loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedIn$.asObservable();

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setSession(token: string, user?: any): void {
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.loggedIn$.next(true);
  }

  loginWithGoogle(): void {
    window.location.href = `${this.authUrl}/google`;
  }

  loginDemo(): Observable<any> {
    return this.http.get(`${this.authUrl}/demo-login`);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn$.next(false);
  }

}