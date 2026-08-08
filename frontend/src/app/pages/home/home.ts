import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { CommunityService } from '../../services/community.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    DatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  private router = inject(Router);
  private communityService = inject(CommunityService);

  source = '';
  destination = '';
  journeyDate = '';

  popularPosts: Post[] = [];
  loadingCommunity = true;

  ngOnInit(): void {
    this.loadCommunityPosts();
  }

  loadCommunityPosts(): void {
    this.loadingCommunity = true;
    this.communityService.getPosts().subscribe({
      next: (response) => {
        if (response.success && response.posts) {
          this.popularPosts = response.posts.slice(0, 3);
        }
        this.loadingCommunity = false;
      },
      error: () => {
        this.loadingCommunity = false;
      }
    });
  }

  searchBuses(): void {
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