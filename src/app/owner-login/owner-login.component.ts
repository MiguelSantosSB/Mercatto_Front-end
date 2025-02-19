import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.scss']
})
export class OwnerLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onLogin() {
    this.authService.loginOwner(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('ownerToken', response.token);
        this.notificationService.showSuccess('Login realizado com sucesso!', 'Bem-vindo');
        this.router.navigate(['/owner']);
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
        this.notificationService.showError('Email ou senha inválidos', 'Erro no login');
      }
    });
  }
}
