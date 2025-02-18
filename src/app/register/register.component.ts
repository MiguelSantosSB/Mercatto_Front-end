import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule]
})

export class RegisterComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  onSubmit() {
    this.authService.register(
      this.user.name,
      this.user.email,
      this.user.phone,
      this.user.password
    ).subscribe({
      next: () => {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error('Erro ao realizar cadastro. Tente novamente.');
        console.error('Erro no cadastro:', err);
      }
    });

  }
}
