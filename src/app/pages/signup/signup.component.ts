import { Component } from '@angular/core';
import { DefaultSignupLayoutComponent } from '../../components/default-signup-layout/default-signup-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


interface signupForm {
  name: FormControl,
  email: FormControl,
  number: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultSignupLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent

  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<signupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService

  ){
    this.signupForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      number: new FormControl('',[Validators.required, Validators.minLength(11)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  } 
  
  submit(){
    this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.number,this.signupForm.value.password).subscribe({
      next: () => this.toastService.success("Signup feito com sucesso!"),
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
