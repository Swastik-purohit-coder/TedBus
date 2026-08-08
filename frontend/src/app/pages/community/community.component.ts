import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommunityService } from '../../services/community.service';
import { Post } from '../../core/models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {

  private communityService = inject(CommunityService);

  posts: Post[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;

    this.communityService.getPosts().subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load community posts', error);
        this.loading = false;
      }
    });
  }

  likePost(post: Post): void {
    this.communityService.toggleLike(post._id).subscribe({
      next: (response) => {
        if (response.success) {
          if (response.liked) {
            post.likes.push('current-user');
          } else {
            post.likes.pop();
          }
        }
      },
      error: (error) => {
        console.error('Like failed', error);
      }
    });
  }

  sharePost(post: Post): void {
    const url = `${window.location.origin}/community/post/${post._id}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Post link copied!');
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.display = 'none';
    }
  }

}