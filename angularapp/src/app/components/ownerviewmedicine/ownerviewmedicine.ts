import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownerviewmedicine',
  standalone: false,
  templateUrl: './ownerviewmedicine.html',
  styleUrl: './ownerviewmedicine.css',
})
export class Ownerviewmedicine implements OnInit {
  medicines: Medicine[] = [];
  newAArr: Medicine[] = [];
  selectedImage: string | null = null;
  selectedMedicine: Medicine | null = null;
  isDeleteModalOpen: boolean = false;
  selectedMedicineId: number | null = null;

  constructor(private service: MedicineService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.service.getAllMedicine().subscribe((x) => {
      this.medicines = x;
      this.newAArr = x;
    });
  }

  searchChange(val: string): void {
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

  openRequestForm(medicineId: number, medicineName: string): void {
    this.router.navigate(['/requestForm'], {
      queryParams: {
        requestType: 'Medicine',
        sourceComponent: 'ownerviewmedicine',
        mId: medicineId,
        mName: medicineName,
      },
    });
  }

  openDeleteModal(medicineId: number): void {
    this.selectedMedicineId = medicineId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedMedicineId = null;
  }

  deleteMedicine(): void {
    if (this.selectedMedicineId) {
      this.service
        .deleteMedicine(this.selectedMedicineId)
        .subscribe((response) => {
          alert('Medicine deleted');
          this.medicines = this.medicines.filter(
            (medicine) => medicine.medicineId !== this.selectedMedicineId
          );
          this.newAArr = this.newAArr.filter(
            (medicine) => medicine.medicineId !== this.selectedMedicineId
          );
          this.closeDeleteModal();
        });
    }
  }
}
