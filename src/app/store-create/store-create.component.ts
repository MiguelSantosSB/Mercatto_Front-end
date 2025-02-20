import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.scss']
})
export class StoreCreateComponent {
  name: string = '';
  description: string = '';
  cnpj: string = '';
  telephone: string = '';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private storeService: StoreService
  ) {}

  onSubmit() {
    const token = jwtDecode(localStorage.getItem('token') || '');
    const email = token.sub as string;
    
    this.storeService.getUserIdByEmail(email).subscribe({
      next: (userId: number) => {
        const address_id = Number(localStorage.getItem('createdAddressId'));
        const owner_id = userId;

        if (!address_id || !owner_id) {
          this.notificationService.showError('IDs inválidos','Error')
          return;
        }

        const storeData = {
          name: this.name,
          description: this.description,
          cnpj: this.cnpj,
          telephone: this.telephone,
          address: address_id,
          owner: owner_id
        };

        this.http.post('http://localhost:8080/store/create', storeData).subscribe({
          next: () => {
            this.notificationService.showSuccess('Loja criada com sucesso!', 'Sucesso');
            localStorage.removeItem('createdAddressId');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao criar loja:', error);
            this.notificationService.showError('Erro ao criar loja', 'Erro');
            this.router.navigate(['owner']);
          }
        });
      },
      error: (error) => {
        console.error('Erro ao obter ID do usuário:', error);
        this.notificationService.showError('Erro ao obter ID do usuário', 'Erro');
      }
    });
  }
}
