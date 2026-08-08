import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Post } from '../core/models/post.model';
import { Comment } from '../core/models/comment.model';
import {
  ForumTopic,
  ForumPost
} from '../core/models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/community`;

  getPosts(): Observable<{ success: boolean; posts: Post[] }> {
    return this.http.get<{ success: boolean; posts: Post[] }>(
      `${this.apiUrl}/posts`
    );
  }

  getPost(id: string): Observable<{ success: boolean; post: Post }> {
    return this.http.get<{ success: boolean; post: Post }>(
      `${this.apiUrl}/posts/${id}`
    );
  }

  createPost(data: {
    title: string;
    content: string;
    imageUrl?: string;
  }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/posts`,
      data
    );
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/posts/${id}`
    );
  }

  toggleLike(id: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/posts/${id}/like`,
      {}
    );
  }

  getPopularPosts(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/posts/popular`
    );
  }

  getComments(postId: string): Observable<{
    success: boolean;
    comments: Comment[];
  }> {
    return this.http.get<{
      success: boolean;
      comments: Comment[];
    }>(
      `${this.apiUrl}/comments/post/${postId}`
    );
  }

  createComment(
    postId: string,
    text: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/comments/post/${postId}`,
      { text }
    );
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/comments/${id}`
    );
  }

  getForums(): Observable<{
    success: boolean;
    topics: ForumTopic[];
  }> {
    return this.http.get<{
      success: boolean;
      topics: ForumTopic[];
    }>(
      `${this.apiUrl}/forums`
    );
  }

  createForumTopic(data: {
    title: string;
    description: string;
    category: string;
  }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/forums`,
      data
    );
  }

  getForumPosts(topicId: string): Observable<{
    success: boolean;
    posts: ForumPost[];
  }> {
    return this.http.get<{
      success: boolean;
      posts: ForumPost[];
    }>(
      `${this.apiUrl}/forums/${topicId}/posts`
    );
  }

  createForumPost(
    topicId: string,
    content: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/forums/${topicId}/posts`,
      { content }
    );
  }

  reportPost(
    post: string,
    reason: string,
    description?: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reports`,
      {
        post,
        reason,
        description
      }
    );
  }

  reportComment(
    comment: string,
    reason: string,
    description?: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reports`,
      {
        comment,
        reason,
        description
      }
    );
  }
}