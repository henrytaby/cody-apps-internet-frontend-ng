import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signin-form',
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './signin-form.component.html',
})
export class SigninFormComponent {

  email = '';
  password = '';

  isLoading = false;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  onSignIn() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa ambos campos.';
      this.cdr.markForCheck();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();
    
    this.authService.login({
      username: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Tus datos de autentificación están mal, por favor vuelve a intentar.';
        this.cdr.markForCheck();
        console.error('Login failed', err);
      }
    });
  }
}
