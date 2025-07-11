import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-useraddfeedback',
  standalone: false,
  templateUrl: './useraddfeedback.html',
  styleUrl: './useraddfeedback.css',
})
export class Useraddfeedback implements OnInit {
  FeedBackForm: FormGroup;
  userId: number;
  addFeedBacks: Feedback = {};
  isSubmitted: boolean = false;
  showPopup: boolean = false;

  constructor(
    private service: FeedbackService,
    private build: FormBuilder,
    private store: UserStoreService
  ) {
    this.FeedBackForm = this.build.group({
      feedbackText: ['', Validators.required],
    });
    this.userId = this.store.getId();
  }

  ngOnInit(): void {}

  addFeedBack() {
    if (this.FeedBackForm.valid) {
      const formValue = this.FeedBackForm.value;
      const feedbackData: Feedback = {
        feedbackText: formValue.feedbackText,
        date: new Date(),
        user: {
          userId: this.userId,
        },
      };
      this.service.addFeedback(feedbackData).subscribe(() => {
        this.FeedBackForm.reset();
        this.isSubmitted = true;
        this.showPopup = true;
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
