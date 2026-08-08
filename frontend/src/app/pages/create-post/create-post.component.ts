import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent {

  private fb = inject(FormBuilder);
  private communityService = inject(CommunityService);
  private router = inject(Router);

  submitting = false;

  postForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(150)
      ]
    ],

    content: [
      '',
      [
        Validators.required,
        Validators.maxLength(5000)
      ]
    ],

    imageUrl: ['']
  });

  submitPost(): void {

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const rawValue = this.postForm.getRawValue();
    const payload = {
      title: rawValue.title || '',
      content: rawValue.content || '',
      imageUrl: rawValue.imageUrl || undefined
    };

    this.communityService
      .createPost(payload)
      .subscribe({
        next: () => {
          this.submitting = false;

          this.router.navigate([
            '/community'
          ]);
        },

        error: (error) => {
          console.error(
            'Post creation failed',
            error
          );

          this.submitting = false;
        }
      });
  }
}