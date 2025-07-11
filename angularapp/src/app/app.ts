import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'BankWebAppService';
  isHomePage: boolean = false;

  constructor(public store: UserStoreService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home';
    });
  }

  role?: string;

  ngOnInit(): void {}
}
