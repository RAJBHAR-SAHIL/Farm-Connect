import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-createmedicine',
  standalone: false,
  templateUrl: './createmedicine.html',
  styleUrl: './createmedicine.css',
})
export class Createmedicine implements OnInit {
  medicineForm!: FormGroup;
  selectedFile: string | null = null;
  errorMessage: string | null = null;
  modalVisible = false;
  addMedicines!: Medicine;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    private router: Router,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
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
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  base64Image: string = '';
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.base64Image = this.base64Image.split(',')[1];
    };
    reader.onerror = (error) => {};
  }

  addMedicine(): void {
    if (this.medicineForm.invalid) {
      this.medicineForm.markAllAsTouched();
    } else {
      const formValue = this.medicineForm.value;
      const medicineData: Medicine = {
        medicineName: formValue.medicineName,
        brand: formValue.brand,
        category: formValue.category,
        description: formValue.description,
        quantity: formValue.quantity,
        unit: formValue.unit,
        pricePerUnit: formValue.pricePerUnit,
        image: this.base64Image,
        user: {
          userId: this.userId,
        },
      };

      this.service.addMedicine(medicineData).subscribe(
        () => {
          this.modalVisible = true;
          this.medicineForm.reset();
        },
        (error) => {
          this.errorMessage = error.error;
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
