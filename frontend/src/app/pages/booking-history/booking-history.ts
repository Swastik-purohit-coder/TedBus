import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingService }
from '../../services/booking.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.html'
})
export class BookingHistoryComponent implements OnInit {

  bookings: any[] = [];

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.loadBookings();

  }

  loadBookings() {

    this.bookingService
      .getMyBookings()
      .subscribe({

        next: (response: any) => {

          this.bookings =
            response.bookings;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  cancelBooking(id: string) {

    const confirmed = confirm(
      'Cancel this booking?'
    );

    if (!confirmed) return;

    this.bookingService
      .cancelBooking(id)
      .subscribe({

        next: () => {

          alert(
            'Booking Cancelled Successfully'
          );

          this.loadBookings();

        },

        error: (error) => {

          console.error(error);

          alert(
            'Unable to cancel booking'
          );

        }

      });

  }

}