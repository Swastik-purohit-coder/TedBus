import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BookingService }
from '../../services/booking.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html'
})
export class PaymentComponent {

  bus: any;

  seats: string[] = [];

  passenger: any;

  totalAmount = 0;

  loading = false;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {

    this.bus = JSON.parse(
      localStorage.getItem('selectedBus') || '{}'
    );

    this.seats = JSON.parse(
      localStorage.getItem('selectedSeats') || '[]'
    );

    this.passenger = JSON.parse(
      localStorage.getItem('passengerDetails') || '{}'
    );

    this.totalAmount =
      this.bus.fare * this.seats.length;

  }

  payNow() {

    this.loading = true;

    const bookingPayload = {

      busId: this.bus._id,

      passengerName:
        this.passenger.fullName,

      age:
        this.passenger.age,

      gender:
        this.passenger.gender,

      phone:
        this.passenger.phone,

      seats:
        this.seats,

      amount:
        this.totalAmount

    };

    this.bookingService
      .createBooking(bookingPayload)
      .subscribe({

        next: () => {

          localStorage.removeItem(
            'selectedBus'
          );

          localStorage.removeItem(
            'selectedSeats'
          );

          localStorage.removeItem(
            'passengerDetails'
          );

          alert(
            'Booking Successful'
          );

          this.router.navigate([
            '/booking-history'
          ]);

        },

        error: (error) => {

          console.error(error);

          alert(
            error.error.message
          );

          this.loading = false;

        }

      });

  }

}