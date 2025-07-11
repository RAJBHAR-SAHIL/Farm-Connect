import { Component } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  standalone: false,
  templateUrl: './usernav.html',
  styleUrl: './usernav.css',
})
export class Usernav {
  isLogoutModalOpen = false;

  ngOnInit(): void {}

  constructor(public store: UserStoreService, private router: Router) {}

  public logOut(): void {
    this.store.getRole();
    if (this.store) {
      this.store.clear();
    }
    this.router.navigate(['/login']);
  }

  public openLogoutModal(): void {
    this.isLogoutModalOpen = true;
  }

  public closeLogoutModal(): void {
    this.isLogoutModalOpen = false;
  }

  public confirmLogout(): void {
    this.logOut();
    this.closeLogoutModal();
  }
}
