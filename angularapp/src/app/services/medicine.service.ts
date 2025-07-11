import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  public apiUrl: string = environment.url;
  constructor(private http: HttpClient) {}

  public addMedicine(requestObject: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(
      this.apiUrl + '/api/medicine',
      requestObject
    );
  }

  public getMedicineByUserId(id: number): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl + '/api/medicine/user/' + id);
  }
  public getMedicineById(id: string): Observable<Medicine> {
    return this.http.get<Medicine>(this.apiUrl + '/api/medicine/' + id);
  }
  public getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl + '/api/medicine');
  }
  public deleteMedicine(medicineId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/api/medicine/' + medicineId);
  }
  public updateMedicine(
    id: string,
    requestObject: Medicine
  ): Observable<Medicine> {
    return this.http.put<Medicine>(
      this.apiUrl + '/api/medicine/' + id,
      requestObject
    );
  }
}
