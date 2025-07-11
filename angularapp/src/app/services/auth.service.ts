import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  register(user: LoginUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/register', user);
  }

  login(login: LoginUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/login', login);
  }
}
