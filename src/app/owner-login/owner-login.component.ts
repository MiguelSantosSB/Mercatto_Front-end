import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';
import { jwtDecode } from 'jwt-decode';

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
    private notificationService: NotificationService,
    private storeService: StoreService
  ) {}

  onLogin() {
    this.authService.loginOwner(this.email, this.password).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Login realizado com sucesso!', 'Bem-vindo');

        // Verifica se o owner já tem uma loja cadastrada
        localStorage.setItem('token', response.token);
        
        const decodedToken: any = jwtDecode(response.token);
        const email = decodedToken.sub;
        console.log("Email decodificado: ", email);
        
        this.storeService.getUserIdByEmail(email).subscribe({
          next: (userId) => {
            this.storeService.getOwnerStore(userId).subscribe({
              next: (store: any) => {
                if (store) {
                  this.notificationService.showSuccess('Logado com sucesso', 'Acesso autorizado');
                  this.router.navigate(['/owner'])
                } else {
                  this.router.navigate(['/address/create'])
                }
              },
              error: (error) => {
                console.error('Erro ao buscar loja:', error);
                this.notificationService.showError('Erro ao buscar loja do usuário');
                this.router.navigate(['/address/create']);
              }
            });
          },
          error: (error) => {
              console.error('Erro ao buscar ID do usuário:', error);
              this.notificationService.showError('Erro ao buscar ID do usuário', 'Erro no login');
          }
        });
      }
    });
  }
}
