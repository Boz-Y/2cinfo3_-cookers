import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";
import {AuthService} from "../../service/auth.service";
import { AuthInterceptor } from '../../helpers/auth.interceptor';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
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
export class SignupModule { }
