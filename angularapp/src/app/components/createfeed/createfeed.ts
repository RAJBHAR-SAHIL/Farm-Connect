import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-createfeed',
  standalone: false,
  templateUrl: './createfeed.html',
  styleUrls: ['./createfeed.css'],
})
export class Createfeed implements OnInit {
  feedForm!: FormGroup;
  selectedFile: string | null = null;
  errorMessage: string | null = null;
  modalVisible: boolean = false;
  base64Image: string = '';

  userId: number;

  constructor(
    private fb: FormBuilder,
    private service: FeedService,
    private router: Router,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId(); // safely get userId in constructor
  }

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feedName: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      pricePerUnit: [0, [Validators.required, Validators.min(1)]],
      image: [''],
    });
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      this.base64Image = result.split(',')[1]; // remove data:image/...;base64,
    };
    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
    };
  }

  addFeed(): void {
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedForm.value;
    const feedData: Feed = {
      feedName: formValue.feedName,
      type: formValue.type,
      description: formValue.description,
      quantity: formValue.quantity,
      unit: formValue.unit,
      pricePerUnit: formValue.pricePerUnit,
      image: this.base64Image,
      user: {
        userId: this.userId,
      },
    };

    this.service.addFeed(feedData).subscribe({
      next: () => {
        this.modalVisible = true;
        this.feedForm.reset();
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Feed with the same name and type already exists';
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.feedForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  navigateToViewFeed(): void {
    this.router.navigate(['/viewFeed']);
  }
}
