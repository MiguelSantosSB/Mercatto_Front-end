import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.scss'
})
export class OwnerRegisterComponent {
  owner = {
    name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  onSubmit() {
      this.authService.registerOwner(
        this.owner.name,
        this.owner.email,
        this.owner.phone,
        this.owner.cpf,
        this.owner.rg,
        this.owner.password
      ).subscribe({
        next: () => {
          this.toastr.success('Vendedor cadastrado com sucesso!'), 
          this.router.navigate(['/owner']);
        },
        error: (err) => {
          this.toastr.error('Erro ao cadastrar vendedor. Tente novamente.')
          console.error('Erro no cadastro:', err);
        }
      });
      
  }
}

