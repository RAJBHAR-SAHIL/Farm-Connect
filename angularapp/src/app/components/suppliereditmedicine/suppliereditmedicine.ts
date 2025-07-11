import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-suppliereditmedicine',
  standalone: false,
  templateUrl: './suppliereditmedicine.html',
  styleUrl: './suppliereditmedicine.css',
})
export class Suppliereditmedicine implements OnInit {
  medicineForm: FormGroup;
  currentImage: string | null = null;
  id: string | null = null;
  errorMessage: string | null = null;
  modalVisible = false;
  userId: number;
  base64Image: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    private ar: ActivatedRoute,
    private router: Router,
    private store: UserStoreService
  ) {
    this.medicineForm = this.fb.group({
      medicineName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      image: [''],
    });
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('medicineId');
    if (this.id) {
      this.service.getMedicineById(this.id).subscribe((x) => {
        this.medicineForm.patchValue(x);
        if (x.image) {
          this.currentImage = 'data:image/jpg;base64,' + x.image;
        }
      });
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Image = (reader.result as string).split(',')[1];
      console.log(this.base64Image);
    };
    reader.onerror = (error) => {};
  }

  addMedicine(): void {
    if (this.medicineForm.invalid) {
      this.medicineForm.markAllAsTouched();
    } else {
      const medicineData: Medicine = {
        ...this.medicineForm.value,
        image: this.base64Image
          ? this.base64Image
          : this.currentImage?.split(',')[1],
        user: {
          userId: this.userId,
        },
      };

      this.service.updateMedicine(this.id!, medicineData).subscribe(
        () => {
          this.medicineForm.reset();
          this.modalVisible = true;
          this.currentImage = null;
        },
        (error) => {
          this.errorMessage =
            'Medicine with the same name and brand already exists';
        }
      );
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.medicineForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  navigateToViewMedicine(): void {
    this.router.navigate(['/viewMedicine']);
  }
}
