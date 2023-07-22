import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";
import {AuthService} from "../../service/auth.service";
import { ResetPasswordRoutingModule } from './reset-password-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule, // Assurez-vous que FormsModule est importé ici
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResetPasswordModule { }
