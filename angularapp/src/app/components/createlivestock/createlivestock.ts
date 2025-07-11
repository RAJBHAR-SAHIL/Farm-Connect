import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivestockService } from '../../services/livestock.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';
import { Livestock } from '../../models/livestock.model';

@Component({
  selector: 'app-createlivestock',
  standalone: false,
  templateUrl: './createlivestock.html',
  styleUrl: './createlivestock.css',
})
export class Createlivestock implements OnInit {
  addLiveStock!: FormGroup;
  errorMessage: string = '';
  modalVisible = false;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private service: LivestockService,
    private store: UserStoreService,
    private router: Router
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.addLiveStock = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
      healthCondition: ['', Validators.required],
      location: ['', Validators.required],
      vaccinationStatus: ['', Validators.required],
    });
  }

  addlivestock() {
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
      this.service.addLivestock(LiveStockeData).subscribe(
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

  navigateToViewMedicine(): void {
    this.router.navigate(['/viewLivestock']);
  }
}
