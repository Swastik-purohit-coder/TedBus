import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './bus-list.html'
})
export class BusListComponent implements OnInit {

  buses: any[] = [];

  constructor(
    private busService: BusService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const source = params['source'];
      const destination = params['destination'];

      if (source && destination) {

        this.searchBuses(source, destination);

      } else {

        this.loadBuses();

      }

    });

  }

  loadBuses() {

    this.busService.getBuses()
      .subscribe({

        next: (response: any) => {

          this.buses = response.buses;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  searchBuses(
    source: string,
    destination: string
  ) {

    this.busService
      .searchBuses(source, destination)
      .subscribe({

        next: (response: any) => {

          this.buses = response.buses;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}