import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService} from 'ngx-toastr';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from "ngx-spinner";
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
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    authInterceptorProviders,
    AuthService,
    AuthInterceptor,
    ToastrService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupModule { }
