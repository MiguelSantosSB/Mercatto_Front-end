import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OwnerSpaceComponent } from './owner-space/owner-space.component';
import { OwnerRegisterComponent } from './owner-register/owner-register.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'owner', component: OwnerSpaceComponent },
  { path: 'owner-register', component: OwnerRegisterComponent },
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
