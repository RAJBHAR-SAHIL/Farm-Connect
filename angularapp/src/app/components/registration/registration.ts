import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private service: AuthService,
    private router: Router,
    private build: FormBuilder
  ) {
    this.registerForm = this.build.group({
      username: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      userRole: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  register(): void {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        (x) => {
          alert('signup successfull');
          this.router.navigate(['/home']);
        },
        (err) => {
          alert('user already exists');
        }
      );
    }
  }

  public toLogin(): void {
    this.router.navigate(['/login']);
  }

  public togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  public toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType =
      this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }
}
