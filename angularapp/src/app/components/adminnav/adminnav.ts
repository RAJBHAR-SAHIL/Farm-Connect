import { Component } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  standalone: false,
  templateUrl: './adminnav.html',
  styleUrl: './adminnav.css',
})
export class Adminnav {
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
