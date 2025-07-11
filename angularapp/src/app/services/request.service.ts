import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../models/request.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  apiUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(`${this.apiUrl}/api/request`, request);
  }

  getRequestByUserId(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(
      this.apiUrl + '/api/request/user/' + userId
    );
  }

  deleteRequest(requestId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/request/${requestId}`);
  }

  getRequestByMedicineOrFeedUserId(userId: string): Observable<Request[]> {
    return this.http.get<Request[]>(
      this.apiUrl + '/api/request/user/' + userId
    );
  }

  updateRequest(
    requestId: number,
    requestObject: Request
  ): Observable<Request> {
    return this.http.put<any>(
      this.apiUrl + '/api/request/' + requestId,
      requestObject
    );
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl + '/api/request');
  }
}
