import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl =
    'http://localhost:5000/api/profile';

  constructor(
    private http: HttpClient
  ) {}

  getProfile() {

    const token =
      localStorage.getItem('token');

    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      });

    return this.http.get(
      this.apiUrl,
      { headers }
    );

  }

}