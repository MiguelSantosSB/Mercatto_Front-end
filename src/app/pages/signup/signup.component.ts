import { Component } from '@angular/core';
import { DefaultSignupLayoutComponent } from '../../components/default-signup-layout/default-signup-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';

interface signupForm {
  name: FormControl,
  email: FormControl,
  number: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultSignupLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<signupForm>;

  constructor(
    private router: Router

  ){
    this.signupForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      number: new FormControl('',[Validators.required, Validators.minLength(11)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  } 
  
  navigate(){
    this.router.navigate(["login"])
  }
}
