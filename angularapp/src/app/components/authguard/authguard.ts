import { Component } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authguard',
  standalone: false,
  templateUrl: './authguard.html',
  styleUrl: './authguard.css',
})
export class Authguard implements CanActivate {
  constructor(private router: Router, private store: UserStoreService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.store?.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
