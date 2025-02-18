import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}


  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.toastr.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.toastr.error('Erro ao realizar login. Verifique suas credenciais.');
        console.error('Erro no login:', error);
      }

    });
  }

  onCadastro(): void {
    this.router.navigate(['/register']);
  }

}
