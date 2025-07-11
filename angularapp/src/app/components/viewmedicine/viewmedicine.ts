import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-viewmedicine',
  standalone: false,
  templateUrl: './viewmedicine.html',
  styleUrl: './viewmedicine.css',
})
export class Viewmedicine implements OnInit {
  medicines: Medicine[] = [];
  newAArr: Medicine[] = [];
  isModalOpen = false;
  isDeleteModalOpen = false;
  selectedImage: string | null = null;
  selectedMedicine: Medicine | null = null;
  errorMessage: string = '';
  selectedFile!: File;
  image!: string;
  userId: number;

  constructor(
    private service: MedicineService,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.getAllMedicinesByUserId();
  }

  getAllMedicinesByUserId(): void {
    this.service.getMedicineByUserId(this.userId).subscribe((x) => {
      this.medicines = x;
      this.newAArr = x;
    });
  }

  openModal(image: string): void {
    console.log(image);

    this.selectedImage = `/${image}`;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  confirmDelete(medicine: Medicine): void {
    this.selectedMedicine = medicine;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedMedicine = null;
    this.errorMessage = '';
  }

  deleteMedicine(): void {
    if (this.selectedMedicine) {
      this.service.deleteMedicine(this.selectedMedicine.medicineId!).subscribe(
        () => {
          this.medicines = this.medicines.filter(
            (m) => m.medicineId !== this.selectedMedicine!.medicineId
          );
          this.closeDeleteModal();
          this.errorMessage = '';
        },
        (error) => {
          if (error.status === 409) {
            this.errorMessage =
              'Medicine cannot be deleted, it is referenced in request';
          }
        }
      );
    }
  }

  searchChange(val: string) {
    if (val) {
      this.medicines = this.newAArr.filter((x) => {
        return (
          x.brand.toLowerCase().includes(val.toLowerCase()) ||
          x.category.toLowerCase().includes(val.toLowerCase()) ||
          x.description.toLowerCase().includes(val.toLowerCase()) ||
          x.medicineName.toLowerCase().includes(val.toLowerCase()) ||
          x.unit.toLowerCase().includes(val.toLowerCase()) ||
          x.pricePerUnit === Number(val) ||
          x.quantity === Number(val)
        );
      });
    } else {
      this.medicines = this.newAArr;
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
      this.medicines.sort((a, b) => {
        const fieldA = a[sortField as keyof Medicine] ?? '';
        const fieldB = b[sortField as keyof Medicine] ?? '';

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
      this.medicines = [...this.newAArr];
    }
  }
}
