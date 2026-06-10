import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiUrl = 'http://localhost:5000/api/buses';

  constructor(
    private http: HttpClient
  ) {}

  getBuses(): Observable<any> {

    return this.http.get(this.apiUrl);

  }
  searchBuses(
  source: string,
  destination: string
) {

  return this.http.get(

    `${this.apiUrl}/search?source=${source}&destination=${destination}`

  );

}
getBusById(id: string) {
  return this.http.get(
    `${this.apiUrl}/${id}`
  );
}

}