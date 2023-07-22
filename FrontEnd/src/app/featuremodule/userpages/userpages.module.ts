import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserpagesRoutingModule } from './userpages-routing.module';
import { UserpagesComponent } from './userpages.component';
import { AuthInterceptor, authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';


@NgModule({
  declarations: [
    UserpagesComponent
  ],
  imports: [
    CommonModule,
    UserpagesRoutingModule,
    HttpClientModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthInterceptor,
    UserService,
    AuthService
  ]
})
export class UserpagesModule { }
