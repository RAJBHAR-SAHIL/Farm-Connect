import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  apiUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl + '/api/feedback', feedback);
  }
  getAllfeedbacksByUserId(userId: number): Observable<Feedback[]> {
    console.log('id: :::' + userId);
    return this.http.get<Feedback[]>(
      this.apiUrl + '/api/feedback/user/' + userId
    );
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/api/feedback/' + feedbackId);
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl + '/api/feedback');
  }
}
