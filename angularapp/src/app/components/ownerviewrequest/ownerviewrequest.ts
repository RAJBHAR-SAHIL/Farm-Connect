import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { UserStoreService } from '../../services/user-store.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-ownerviewrequest',
  standalone: false,
  templateUrl: './ownerviewrequest.html',
  styleUrl: './ownerviewrequest.css',
})
export class Ownerviewrequest implements OnInit {
  requests: Request[] = [];
  showModal: boolean = false;
  selectedRequestId: number | null = null;
  searchText: string = '';
  userId: number;

  constructor(
    private requestService: RequestService,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.requestService.getRequestByUserId(this.userId).subscribe((data) => {
      this.requests = data.slice();
    });
  }

  openDelete(requestId: number): void {
    this.selectedRequestId = requestId;
    this.showModal = true;
  }

  closeDelete(): void {
    this.showModal = false;
    this.selectedRequestId = null;
  }

  filteredRequests() {
    if (!this.searchText) {
      return this.requests;
    }
    return this.requests.filter(
      (request) =>
        request
          .requestType!.toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        (request.medicine &&
          request.medicine
            .medicineName!.toLowerCase()
            .includes(this.searchText.toLowerCase())) ||
        (request.feed &&
          request.feed
            .feedName!.toLowerCase()
            .includes(this.searchText.toLowerCase())) ||
        request.status.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSortFieldChange(sortField: string): void {
    if (sortField) {
      this.requests.sort((a, b) => {
        const fieldA = a[sortField as keyof Request] ?? '';
        const fieldB = b[sortField as keyof Request] ?? '';

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
      this.requests = [...this.requests];
    }
  }

  deleteRequest(): void {
    if (this.selectedRequestId) {
      this.requestService
        .deleteRequest(this.selectedRequestId)
        .subscribe((response) => {
          this.requests = this.requests.filter(
            (request) => request.requestId !== this.selectedRequestId
          );
          this.closeDelete();
        });
    }
  }
}
