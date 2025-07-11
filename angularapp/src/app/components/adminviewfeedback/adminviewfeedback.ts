import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminviewfeedback',
  standalone: false,
  templateUrl: './adminviewfeedback.html',
  styleUrls: ['./adminviewfeedback.css'],
})
export class Adminviewfeedback implements OnInit {
  feedback: Feedback[] = [];
  selectedUser: Feedback['user'] | null = null;
  isProfileModalOpen: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private service: FeedbackService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.service.getFeedbacks().subscribe({
      next: (data) => {
        this.feedback = data;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
        this.errorMessage = 'Failed to load feedbacks.';
      },
    });
  }

  showUserProfile(userId: number | undefined): void {
    if (userId === undefined) {
      this.errorMessage = 'Invalid user ID.';
      return;
    }

    const fb = this.feedback.find((fd) => fd.user?.userId === userId);
    this.selectedUser = fb?.user ?? null;
    this.isProfileModalOpen = !!this.selectedUser;
  }

  closeProfileModal(): void {
    this.isProfileModalOpen = false;
    this.selectedUser = null;
    this.errorMessage = null;
  }
}
