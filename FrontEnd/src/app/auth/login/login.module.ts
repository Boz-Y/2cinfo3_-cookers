import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";
import {AuthService} from "../../service/auth.service";
import { AuthInterceptor } from '../../helpers/auth.interceptor';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule, // Assurez-vous que FormsModule est importé ici
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthService,
    AuthInterceptor,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule { }
