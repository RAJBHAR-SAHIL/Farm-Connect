import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivestockService } from '../../services/livestock.service';
import { UserStoreService } from '../../services/user-store.service';
import { Livestock } from '../../models/livestock.model';

@Component({
  selector: 'app-ownereditlivestock',
  standalone: false,
  templateUrl: './ownereditlivestock.html',
  styleUrl: './ownereditlivestock.css',
})
export class Ownereditlivestock implements OnInit {
  @Output() livestockUpdated = new EventEmitter<void>();

  editId!: number;
  errorMessage: string = '';
  addLiveStock: FormGroup;
  userId: number;
  modalVisible = false;

  constructor(
    private route: ActivatedRoute,
    private service: LivestockService,
    private fb: FormBuilder,
    private store: UserStoreService,
    private router: Router
  ) {
    this.addLiveStock = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
      healthCondition: ['', Validators.required],
      location: ['', Validators.required],
      vaccinationStatus: ['', Validators.required],
    });
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.editId = this.route.snapshot.params['livestockId'];
    this.service.getLivestockById(this.editId).subscribe((x) => {
      this.addLiveStock.patchValue(x);
    });
  }

  updateLivestocks() {
    if (this.addLiveStock.invalid) {
      this.addLiveStock.markAllAsTouched();
    } else {
      const formValue = this.addLiveStock.value;
      const LiveStockeData: Livestock = {
        name: formValue.name,
        species: formValue.species,
        age: formValue.age,
        breed: formValue.breed,
        healthCondition: formValue.healthCondition,
        location: formValue.location,
        vaccinationStatus: formValue.vaccinationStatus,
        user: {
          userId: this.userId,
        },
      };
      this.service.updateLivestock(this.editId, LiveStockeData).subscribe(
        () => {
          this.modalVisible = true;
          this.addLiveStock.reset();
        },
        (error) => {
          if (error.status === 500) {
            this.errorMessage =
              'Livestock with the same name, breed, and species already exists';
          }
        }
      );
    }
  }
  navigateToViewLiveStock(): void {
    this.router.navigate(['/viewLivestock']);
  }
}
