import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './shared/material-module';
// import { HomeComponent } from './home/home.component';
// import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedModule } from './shared/shared.module';
// import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/login/login.component';
// import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent
    // HomeComponent,
    // BestSellerComponent,
    // FullComponent,
    // AppSidebarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // MaterialModule,
    // FlexLayoutModule,
    // SharedModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
