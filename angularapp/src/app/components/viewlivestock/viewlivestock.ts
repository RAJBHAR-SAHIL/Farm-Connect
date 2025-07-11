import { Component, OnInit } from '@angular/core';
import { Livestock } from '../../models/livestock.model';
import { LivestockService } from '../../services/livestock.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-viewlivestock',
  standalone: false,
  templateUrl: './viewlivestock.html',
  styleUrl: './viewlivestock.css',
})
export class Viewlivestock implements OnInit {
  isModalOpen = false;
  isDeleteModalOpen = false;
  selectedLiveStock: Livestock | null = null;
  livestocks: Livestock[] = [];
  filters: Livestock[] = [];
  userId: number;
  errorMessage: string = '';
  search = '';

  constructor(
    private service: LivestockService,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.loadLivestockData();
  }

  loadLivestockData(): void {
    this.service.getLivestockByUserId(this.userId).subscribe((x) => {
      this.livestocks = x.slice();
      this.filters = x.slice();
    });
  }

  searching() {
    if (!this.search) {
      this.filters = this.livestocks;
    } else {
      this.filters = this.livestocks.filter((x) => {
        return (
          x.name.toLowerCase().includes(this.search.toLowerCase()) ||
          x.breed.toLowerCase().includes(this.search.toLowerCase()) ||
          x.species.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  }

  onSortFieldChange(sortField: string): void {
    if (sortField) {
      this.filters.sort((a, b) => {
        const fieldA = a[sortField as keyof Livestock] ?? '';
        const fieldB = b[sortField as keyof Livestock] ?? '';

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
      this.filters = [...this.livestocks];
    }
  }

  confirmDelete(livestock: Livestock): void {
    this.selectedLiveStock = livestock;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedLiveStock = null;
    this.errorMessage = '';
  }

  deleteLiveStock(): void {
    if (this.selectedLiveStock) {
      this.service
        .deleteLivestock(this.selectedLiveStock.livestockId!)
        .subscribe(
          () => {
            this.filters = this.filters.filter(
              (l) => l.livestockId !== this.selectedLiveStock!.livestockId
            );
            this.closeDeleteModal();
            this.errorMessage = '';
          },
          (error) => {
            if (error.status === 500) {
              this.errorMessage =
                'Livestock cannot be deleted, it is referenced in request';
            }
          }
        );
    }
  }
}
