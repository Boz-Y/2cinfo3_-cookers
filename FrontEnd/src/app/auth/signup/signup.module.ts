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

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    authInterceptorProviders,
    AuthService,
    ToastrService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupModule { }
