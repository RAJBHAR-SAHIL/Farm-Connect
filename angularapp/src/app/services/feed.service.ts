import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  apiUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  public addFeed(feed: Feed): Observable<Feed> {
    return this.http.post<Feed>(this.apiUrl + '/api/feed', feed);
  }

  public getFeedByUserID(id: number): Observable<Feed> {
    return this.http.get(
      this.apiUrl + '/api/feed/user/' + id
    ) as Observable<Feed>;
  }

  public getAllFeed(): Observable<Feed[]> {
    return this.http.get<Feed[]>(this.apiUrl + '/api/feed');
  }

  public getFeedById(id: string): Observable<Feed> {
    return this.http.get(this.apiUrl + '/api/feed/' + id) as Observable<Feed>;
  }

  public deleteFeed(feedId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/api/feed/' + feedId);
  }

  public updateFeed(id: string, feed: Feed): Observable<Feed> {
    return this.http.put(
      this.apiUrl + '/api/feed/' + id,
      feed
    ) as Observable<Feed>;
  }
}
