import { Injectable } from '@angular/core';
import { AuthUser } from '../models/AuthUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  USER_KEY = 'AUTHORIZED_USER';
  constructor() {}

  clear(): void {
    window.sessionStorage.clear();
  }

  public saveUser(authUser: AuthUser): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(authUser));
  }

  public getUser(): any {
    const authUser = window.sessionStorage.getItem(this.USER_KEY);
    if (authUser) {
      return JSON.parse(authUser);
    }
    return {};
  }

  public getId(): number {
    const authId = this.getUser();
    return authId ? authId.userId : 0;
  }

  public name(): string {
    const authId = this.getUser();
    return authId ? authId.username : '';
  }

  public getRole(): string {
    const authRole = this.getUser();
    return authRole ? authRole.userRole : '';
  }

  public isLoggedIn(): boolean {
    const authUser = window.sessionStorage.getItem(this.USER_KEY);
    if (authUser) {
      return true;
    }
    return false;
  }

  public getJwtToken(): string | null {
    const storedUser = window.sessionStorage.getItem(this.USER_KEY);

    if (storedUser) {
      const authUser: AuthUser = JSON.parse(storedUser);
      return authUser.token;
    }

    return null;
  }
}
