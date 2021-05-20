import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterSuccessComponent } from './pages/auth/register-success/register-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { HomeComponent } from './pages/home/home.component';
import { ForgivenPasswordEmailComponent } from './pages/auth/forgivenPassword/forgiven-password-email/forgiven-password-email.component';
import { ChangePasswordComponent } from './pages/auth/forgivenPassword/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    ForgivenPasswordEmailComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2Webstorage.forRoot(),
    RouterModule.forRoot([
      //Register Paths 
      {path: 'register', component: RegisterComponent},
      {path: 'register-success', component: RegisterSuccessComponent},
      //Login Paths
      {path: 'login', component: LoginComponent},
      //Home Paths
      {path: 'home', component: HomeComponent},
      //Forgiven Passwords Paths
      {path: 'forgivenPasswordEmail', component:ForgivenPasswordEmailComponent},
      {path: 'changePassword/:email', component: ChangePasswordComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
