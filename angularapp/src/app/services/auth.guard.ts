import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private store:UserStoreService) { }

  canActivate(): boolean{
    if(this.store.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
