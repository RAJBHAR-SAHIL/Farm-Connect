import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private router:Router,private store:UserStoreService){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    const requiredRole = route.data['role'];
    const userRole = this.store.getRole();

    if(this.store.isLoggedIn() === false){
      this.router.navigate(['/login']);
      return true;
    }
    else if(userRole === requiredRole){
      return true;
    }
    else{
      this.router.navigate(['/error']);
      return false;
    }
  }

}
