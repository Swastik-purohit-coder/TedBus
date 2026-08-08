import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommunityService } from '../../services/community.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../core/models/post.model';
import { Comment } from '../../core/models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    FormsModule
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private communityService = inject(CommunityService);
  public authService = inject(AuthService);

  postId = '';
  post: Post | null = null;
  comments: Comment[] = [];
  
  loadingPost = true;
  loadingComments = true;
  submittingComment = false;

  newCommentText = '';

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    if (this.postId) {
      this.loadPost();
      this.loadComments();
    }
  }

  loadPost(): void {
    this.loadingPost = true;
    this.communityService.getPost(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.post = res.post;
        }
        this.loadingPost = false;
      },
      error: (err) => {
        console.error('Failed to load post', err);
        this.loadingPost = false;
      }
    });
  }

  loadComments(): void {
    this.loadingComments = true;
    this.communityService.getComments(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments = res.comments;
        }
        this.loadingComments = false;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
        this.loadingComments = false;
      }
    });
  }

  likePost(): void {
    if (!this.post) return;

    this.communityService.toggleLike(this.post._id).subscribe({
      next: (res) => {
        if (res.success && this.post) {
          if (res.liked) {
            this.post.likes.push('current-user');
          } else {
            this.post.likes.pop();
          }
        }
      },
      error: (err) => {
        console.error('Like failed', err);
      }
    });
  }

  submitComment(): void {
    if (!this.newCommentText.trim() || !this.postId) return;

    this.submittingComment = true;
    this.communityService.createComment(this.postId, this.newCommentText).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments.push(res.comment);
          if (this.post) {
            this.post.commentsCount += 1;
          }
          this.newCommentText = '';
        }
        this.submittingComment = false;
      },
      error: (err) => {
        console.error('Failed to submit comment', err);
        this.submittingComment = false;
      }
    });
  }

  deleteComment(commentId: string): void {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    this.communityService.deleteComment(commentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.comments = this.comments.filter(c => c._id !== commentId);
          if (this.post && this.post.commentsCount > 0) {
            this.post.commentsCount -= 1;
          }
        }
      },
      error: (err) => {
        console.error('Failed to delete comment', err);
      }
    });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.display = 'none';
    }
  }

}
