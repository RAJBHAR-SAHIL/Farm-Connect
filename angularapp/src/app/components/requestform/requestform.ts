import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livestock } from '../../models/livestock.model';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivestockService } from '../../services/livestock.service';
import { UserStoreService } from '../../services/user-store.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-requestform',
  standalone: false,
  templateUrl: './requestform.html',
  styleUrl: './requestform.css',
})
export class Requestform implements OnInit {
  requestForm!: FormGroup;
  livestocks: Livestock[] = [];
  modalVisible: boolean = false;

  sourceComponent: string = '';
  medicineId: number = 0;
  feedId: number = 0;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private liveStockService: LivestockService,
    private store: UserStoreService
  ) {
    this.userId = this.store.getId();
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      requestType: ['', Validators.required],
      medicineName: [''],
      feedName: [''],
      quantity: [0, [Validators.required, Validators.min(1)]],
      status: ['Pending', Validators.required],
      livestockId: [0, Validators.required],
      requestDate: [new Date(), Validators.required],
    });

    this.requestForm
      .get('requestType')
      ?.valueChanges.subscribe((requestType) => {
        const medicineNameControl = this.requestForm.get('medicineName');
        const feedNameControl = this.requestForm.get('feedName');

        if (requestType === 'Medicine') {
          medicineNameControl?.setValidators(Validators.required);
          feedNameControl?.clearValidators();
        } else if (requestType === 'Feed') {
          feedNameControl?.setValidators(Validators.required);
          medicineNameControl?.clearValidators();
        } else {
          medicineNameControl?.clearValidators();
          feedNameControl?.clearValidators();
        }

        medicineNameControl?.updateValueAndValidity();
        feedNameControl?.updateValueAndValidity();
      });

    this.route.queryParams.subscribe((params) => {
      this.requestForm.patchValue({
        requestType: params['requestType'],
        medicineName: params['mName'],
        feedName: params['fName'],
      });
      this.medicineId = params['mId'];
      this.feedId = params['fId'];
      this.sourceComponent = params['sourceComponent'];
    });

    this.liveStockService.getLivestockByUserId(this.userId).subscribe((x) => {
      this.livestocks = x;
    });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const requestData: Request = {
      ...this.requestForm.value,
      user: {
        userId: this.userId,
      },
      medicine: {
        medicineId: this.medicineId,
      },
      feed: {
        feedId: this.feedId,
      },
      livestock: { livestockId: this.requestForm.value.livestockId },
    };

    console.log('Request Data:', requestData);

    this.requestService.addRequest(requestData).subscribe(
      () => {
        this.modalVisible = true;
      },
      (error) => {}
    );
  }

  onCancel(): void {
    this.redirectToSourceComponent();
  }

  navigateToViewMedicine(): void {
    this.modalVisible = false;
    this.redirectToSourceComponent();
  }

  private redirectToSourceComponent(): void {
    if (this.sourceComponent === 'ownerviewmedicine') {
      this.router.navigate(['/ownerViewMedicine']);
    } else if (this.sourceComponent === 'ownerviewfeed') {
      this.router.navigate(['/ownerViewFeed']);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.requestForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}
