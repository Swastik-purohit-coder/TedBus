import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html'
})
export class HomeComponent {

  source = '';
  destination = '';
  journeyDate = '';

  constructor(
    private router: Router
  ) {}

  searchBuses() {

    this.router.navigate(
      ['/buses'],
      {
        queryParams: {
          source: this.source,
          destination: this.destination,
          date: this.journeyDate
        }
      }
    );

  }

}