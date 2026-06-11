import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl =
    `${environment.apiUrl}/profile`

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