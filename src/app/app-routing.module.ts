import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresListComponent } from './stores-list/stores-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OwnerSpaceComponent } from './owner-space/owner-space.component';
import { OwnerRegisterComponent } from './owner-register/owner-register.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { AddressCreateComponent } from './address-create/address-create.component';
import { StoreCreateComponent } from './store-create/store-create.component';
import { StoreComponent } from './store/store.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'owner', component: OwnerSpaceComponent },
  { path: 'owner-register', component: OwnerRegisterComponent },
  { path: 'owner-login', component: OwnerLoginComponent },
  { path: 'address/create', component: AddressCreateComponent },
  { path: 'store/create', component: StoreCreateComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'product/create/:storeId', component: ProductCreateComponent },
  { path: 'stores', component: StoresListComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
