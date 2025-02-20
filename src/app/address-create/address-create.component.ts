import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss']
})
export class AddressCreateComponent {
  street: string = '';
  number: string = '';
  neighborhood: string = '';
  city: string = '';
  state: string = '';
  cep: string = '';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const addressData = {
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      cep: this.cep
    };
    
    this.http.post<{id: string}>('http://localhost:8080/address/create', addressData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ownerToken')}`
      }
    }).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Endereço criado com sucesso!', 'Sucesso');
        localStorage.setItem('createdAddressId', response.id);
        this.router.navigate(['/store/create']);
      },
      error: (error) => {
        console.error('Erro ao criar endereço:', error);
        this.notificationService.showError('Erro ao criar endereço', 'Erro');
        this.router.navigate(['/owner']);
      }
    });
  }
}
