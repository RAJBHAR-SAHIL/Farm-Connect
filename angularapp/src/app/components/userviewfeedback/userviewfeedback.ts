import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-userviewfeedback',
  standalone: false,
  templateUrl: './userviewfeedback.html',
  styleUrl: './userviewfeedback.css',
})
export class Userviewfeedback implements OnInit {
  feedback: Feedback[] = [];
  user: User[] = [];
  userId: number;
  selectedFeedback: Feedback | null = null;
  isDeleteModalOpen: boolean = false;
  feedBackId!: number;

  constructor(
    private service: FeedbackService,
    private router: Router,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.service.getAllfeedbacksByUserId(this.userId).subscribe((x) => {
      this.feedback = x.slice();
    });
  }

  confirmDelete(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.feedBackId = feedback.feedbackId!;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedFeedback = null;
  }

  deleteFeedback(): void {
    if (this.selectedFeedback) {
      this.service.deleteFeedback(this.feedBackId).subscribe(() => {
        this.closeDeleteModal();
        this.getAllFeedbacks();
      });
    }
  }
}
