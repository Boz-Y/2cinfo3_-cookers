import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import {TokenStorageService} from "../service/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }

  public saveToken(token: string): void {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }

  public saveLogin(login:any):void{
    localStorage.removeItem("login");
    localStorage.setItem("login", login);
  }

  public saveUser(user: any): void {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Vérifiez si le token est valide (par exemple, en utilisant une librairie comme jwt-decode)
    return !!token;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
