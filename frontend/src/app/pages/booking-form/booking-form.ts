import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingFormComponent {

  bookingForm: FormGroup;

  submitted = false;

  bus: any;

  seats: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.bookingForm = this.fb.group({

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      age: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],

      gender: [
        '',
        Validators.required
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ]

    });

    this.bus = JSON.parse(
      localStorage.getItem('selectedBus') || '{}'
    );

    this.seats = JSON.parse(
      localStorage.getItem('selectedSeats') || '[]'
    );

  }

  onSubmit() {

    this.submitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    localStorage.setItem(
      'passengerDetails',
      JSON.stringify(
        this.bookingForm.value
      )
    );

    this.router.navigate(['/payment']);

  }

}