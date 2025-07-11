import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LivestockService } from '../../services/livestock.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-supplierrequests',
  standalone: false,
  templateUrl: './supplierrequests.html',
  styleUrl: './supplierrequests.css',
})
export class Supplierrequests implements OnInit {
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  searchControl = new FormControl('');
  isRejectionModalOpen = false;
  rejectionForm: FormGroup;
  selectedRequestId: number | null = null;
  isLivestockModalOpen = false;
  selectedLivestock: any;

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private livestockservice: LivestockService
  ) {
    this.rejectionForm = this.fb.group({
      reason: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRequests();
    this.searchControl.valueChanges.subscribe((value) => {
      this.filterRequests(value);
    });
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe((requests) => {
      this.requests = requests;
      this.filteredRequests = requests;
    });
  }

  filterRequests(query: string | null): void {
    if (!query) {
      this.filteredRequests = this.requests;
    } else {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredRequests = this.requests.filter((request) => {
        const match =
          (request.requestType &&
            request.requestType.toLowerCase().includes(lowerCaseQuery)) ||
          (request.medicine &&
            request.medicine.medicineName &&
            request.medicine.medicineName
              .toLowerCase()
              .includes(lowerCaseQuery)) ||
          (request.feed &&
            request.feed.feedName &&
            request.feed.feedName.toLowerCase().includes(lowerCaseQuery)) ||
          (request.quantity &&
            request.quantity.toString().includes(lowerCaseQuery)) ||
          (request.status &&
            request.status.toLowerCase().includes(lowerCaseQuery));
        return match;
      });
    }
  }

  approveRequest(requestId: number) {
    const requestToUpdate = this.requests.find(
      (req) => req.requestId === requestId
    );
    if (requestToUpdate != null) {
      requestToUpdate.status = 'Approved';
      this.requestService.updateRequest(requestId, requestToUpdate).subscribe(
        (response) => {
          console.log('Request approved', response);
          this.loadRequests();
        },
        (error) => {}
      );
    }
  }

  openRejectionModal(requestId: number) {
    this.selectedRequestId = requestId;
    this.isRejectionModalOpen = true;
  }

  submitRejection() {
    if (this.selectedRequestId !== null) {
      const requestToUpdate = this.requests.find(
        (req) => req.requestId === this.selectedRequestId
      );
      if (requestToUpdate) {
        requestToUpdate.status = 'Rejected';
        requestToUpdate.rejectionReason =
          this.rejectionForm.get('reason')?.value;
        this.requestService
          .updateRequest(this.selectedRequestId, requestToUpdate)
          .subscribe(
            () => {
              this.loadRequests();
              this.closeRejectionModal();
            },
            (error) => {}
          );
      }
    }
  }

  closeRejectionModal() {
    this.isRejectionModalOpen = false;
    this.rejectionForm.reset();
  }

  showLivestock(id?: number): void {
    if (!id) return; // Skip if undefined
    this.livestockservice.getLivestockById(id).subscribe(
      (livestock) => {
        this.selectedLivestock = livestock;
        this.isLivestockModalOpen = true;
      },
      (error) => {
        // Handle error
      }
    );
  }

  closeLivestockModal() {
    this.isLivestockModalOpen = false;
    this.selectedLivestock = null;
  }

  onSortFieldChange(sortField: string): void {
    if (sortField) {
      this.filteredRequests.sort((a, b) => {
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
      this.filteredRequests = [...this.requests];
    }
  }
}
