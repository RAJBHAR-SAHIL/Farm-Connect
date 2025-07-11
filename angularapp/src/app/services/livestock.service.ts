import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livestock } from '../models/livestock.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivestockService {
  apiUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  getAllLivestock(): Observable<Livestock[]> {
    return this.http.get<Livestock[]>(this.apiUrl + '/api/livestock');
  }

  getLivestockByUserId(id: number): Observable<Livestock[]> {
    return this.http.get<Livestock[]>(
      this.apiUrl + '/api/livestock/user/' + id
    );
  }

  getLivestockById(id: number): Observable<Livestock> {
    return this.http.get<Livestock>(this.apiUrl + '/api/livestock/' + id);
  }

  addLivestock(livestock: Livestock): Observable<Livestock> {
    return this.http.post<Livestock>(this.apiUrl + '/api/livestock', livestock);
  }

  updateLivestock(id: number, livestock: Livestock): Observable<Livestock> {
    return this.http.put<Livestock>(
      this.apiUrl + '/api/livestock/' + id,
      livestock
    );
  }

  deleteLivestock(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/api/livestock/' + id);
  }
}
