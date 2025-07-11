import { Component } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { AuthUser } from '../../models/AuthUser.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginUser } from '../../models/login-user';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  authUser?: AuthUser;
  passwordFieldType: string = 'password';

  constructor(
    private store: UserStoreService,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public login(): void {
    let loginUser = new LoginUser(this.username, this.password, '');
    this.service.login(loginUser).subscribe((auser: AuthUser) => {
      this.authUser = auser;
      this.store.saveUser(this.authUser);
      this.router.navigate(['/home']);
    });
  }

  public signOut(): void {
    if (this.store) {
      this.store.clear();
    }
  }

  public togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
