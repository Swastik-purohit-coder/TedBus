import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService }
from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent
implements OnInit {

  user: any = {};

  bookingCount = 0;

  constructor(
    private profileService:
    ProfileService
  ) {}

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile() {

    this.profileService
      .getProfile()
      .subscribe({

        next: (response: any) => {

          this.user =
            response.user;

          this.bookingCount =
            response.bookingCount;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}