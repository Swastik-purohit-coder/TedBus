import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './seat-selection.html'
})
export class SeatSelectionComponent implements OnInit {

  seats: any[] = [];

  bus: any;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService
  ) {}

  ngOnInit(): void {

    const busId = this.route.snapshot.paramMap.get('id');

    if (busId) {

      this.busService.getBusById(busId)
        .subscribe({

          next: (response: any) => {

            this.bus = response.bus;

            this.generateSeats(
              response.bus.bookedSeats
            );

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

  }

  generateSeats(bookedSeats: string[]) {

    const rows = ['A', 'B', 'C', 'D', 'E'];

    this.seats = [];

    rows.forEach(row => {

      for (let i = 1; i <= 4; i++) {

        const seatNumber = `${row}${i}`;

        this.seats.push({

          seatNumber,

          booked: bookedSeats.includes(seatNumber),

          selected: false

        });

      }

    });

  }

  selectSeat(seat: any) {

    if (seat.booked) return;

    seat.selected = !seat.selected;

  }

  getSelectedSeats() {

  return this.seats.filter(
    seat => seat.selected
  );

}

continueBooking() {

  const selectedSeats = this.getSelectedSeats()
    .map(seat => seat.seatNumber);

  localStorage.setItem(
    'selectedSeats',
    JSON.stringify(selectedSeats)
  );

  localStorage.setItem(
    'selectedBus',
    JSON.stringify(this.bus)
  );

}

}