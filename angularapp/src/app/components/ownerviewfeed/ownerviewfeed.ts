import { Component, OnInit } from '@angular/core';
import { Feed } from '../../models/feed.model';
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-ownerviewfeed',
  standalone: false,
  templateUrl: './ownerviewfeed.html',
  styleUrl: './ownerviewfeed.css',
})
export class Ownerviewfeed implements OnInit {
  feeds: Feed[] = [];
  filteredFeeds: Feed[] = [];

  constructor(private router: Router, private service: FeedService) {}

  ngOnInit(): void {
    this.getAllFeed();
  }

  public getAllFeed(): void {
    this.service.getAllFeed().subscribe((feeds) => {
      this.feeds = feeds.slice();
      this.filteredFeeds = feeds.slice();
    });
  }

  openRequestForm(feedId: number, feedName: string): void {
    this.router.navigate(['/requestForm'], {
      queryParams: {
        requestType: 'Feed',
        sourceComponent: 'ownerviewfeed',
        fId: feedId,
        fName: feedName,
      },
    });
  }

  onSearch(event: any): void {
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

  onSortFieldChange(sortField: string): void {
    if (sortField) {
      this.filteredFeeds.sort((a, b) => {
        let valueA = a[sortField as keyof Feed] ?? '';
        let valueB = b[sortField as keyof Feed] ?? '';

        if (typeof valueA === 'string') {
          valueA = valueA.toLowerCase();
        }
        if (typeof valueB === 'string') {
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
          return -1;
        } else if (valueA > valueB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}
