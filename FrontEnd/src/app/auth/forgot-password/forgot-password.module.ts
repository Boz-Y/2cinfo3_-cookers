import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";
import {UserService} from "../../service/user.service";
import { ToastrService} from 'ngx-toastr';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule, // Assurez-vous que FormsModule est importé ici
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    authInterceptorProviders,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForgotPasswordModule { }
