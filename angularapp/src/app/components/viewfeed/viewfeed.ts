import { Component, OnInit } from '@angular/core';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewfeed',
  standalone: false,
  templateUrl: './viewfeed.html',
  styleUrl: './viewfeed.css',
})
export class Viewfeed implements OnInit {
  selectedImage: string | null = null;
  feeds: Feed[] = [];
  filteredFeeds: Feed[] = [];
  feedToDelete: Feed | null = null;
  isDeleteModalOpen = false;
  selectedFile!: File;
  image!: string;
  searchAll = '';
  errorMessage: string = '';

  constructor(
    private feedService: FeedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllFeeds();
  }

  getAllFeeds() {
    this.feedService.getAllFeed().subscribe((data) => {
      this.feeds = data.slice();
      this.filteredFeeds = data.slice();
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredFeeds = this.feeds.filter(
      (feed) =>
        feed.feedName.toLowerCase().includes(searchTerm) ||
        feed.type.toLowerCase().includes(searchTerm) ||
        feed.description.toLowerCase().includes(searchTerm) ||
        feed.quantity.toString().toLowerCase().includes(searchTerm) ||
        feed.unit.toLowerCase().includes(searchTerm) ||
        feed.pricePerUnit.toString().toLowerCase().includes(searchTerm)
    );
  }

  confirmDelete(feed: Feed) {
    this.feedToDelete = feed;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.feedToDelete = null;
    this.errorMessage = '';
  }

  deleteFeed() {
    if (this.feedToDelete) {
      this.feedService.deleteFeed(this.feedToDelete.feedId!).subscribe({
        next: () => {
          this.getAllFeeds();
          this.closeDeleteModal();
          this.errorMessage = '';
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage =
              'Feed cannot be deleted, it is referenced in request';
          } else {
            this.errorMessage = 'An error occurred while deleting the feed.';
          }
        },
      });
    }
  }

  showImage(imageUrl: string) {
    this.selectedImage = 'data:image/jpg;base64,' + imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  onSortFieldChange(sortField: string): void {
    if (sortField) {
      this.filteredFeeds.sort((a, b) => {
        const fieldA = a[sortField as keyof Feed] ?? '';
        const fieldB = b[sortField as keyof Feed] ?? '';

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return fieldA - fieldB;
        }

        const fieldAStr = fieldA.toString().toLowerCase();
        const fieldBStr = fieldB.toString().toLowerCase();

        if (fieldAStr < fieldBStr) return -1;
        if (fieldAStr > fieldBStr) return 1;
        return 0;
      });
    } else {
      this.filteredFeeds = [...this.feeds];
    }
  }
}
