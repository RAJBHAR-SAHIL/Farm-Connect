import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feed } from '../../models/feed.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suppliereditfeed',
  standalone: false,
  templateUrl: './suppliereditfeed.html',
  styleUrl: './suppliereditfeed.css',
})
export class Suppliereditfeed implements OnInit {
  feedForm: FormGroup;
  selectedFile: string | null = null;
  currentImage: string | null = null;
  feedId: string | null = null;
  errorMessage: string | null = null;
  modalVisible: boolean = false;

  constructor(
    private feedService: FeedService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.feedForm = this.formBuilder.group({
      feedName: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      pricePerUnit: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.feedId = this.route.snapshot.paramMap.get('feedId');
    if (this.feedId) {
      this.feedService.getFeedById(this.feedId).subscribe((feed) => {
        this.feedForm.patchValue(feed);
        this.currentImage = 'data:image/jpg;base64,' + feed.image;
      });
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = (reader.result as string).split(',')[1];
        this.feedForm.get('image')!.setValue(this.selectedFile);
        this.currentImage = 'data:image/jpg;base64,' + this.selectedFile;
      };
      reader.readAsDataURL(file);
    }
  }

  addFeed(): void {
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched();
    } else {
      const formValue = this.feedForm.value;
      const feedData: Feed = {
        ...formValue,
        image: this.selectedFile || formValue.image,
      };

      this.checkForDuplicateFeed(feedData).then((isDuplicate) => {
        if (isDuplicate) {
          this.errorMessage = 'Feed with same name and type already exists.';
        } else {
          this.feedService.updateFeed(this.feedId!, feedData).subscribe(
            () => {
              this.feedForm.reset();
              this.modalVisible = true;
              this.selectedFile = null;
              this.currentImage = null;
            },
            (error: HttpErrorResponse) => {
              this.errorMessage = 'An error occurred while updating the feed.';
            }
          );
        }
      });
    }
  }

  checkForDuplicateFeed(feedData: Feed): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.feedService.getAllFeed().subscribe(
        (feeds) => {
          const isDuplicate = feeds.some(
            (feed) =>
              feed.feedName === feedData.feedName ||
              (feed.type === feedData.type && feed.feedId != feedData.feedId)
          );
          resolve(isDuplicate);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.feedForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  navigateToViewFeed(): void {
    this.router.navigate(['/viewFeed']);
  }
}
