import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.setItem("token", token);
  }

  public saveRole(role:any):void{
    window.sessionStorage.removeItem("role");
    window.sessionStorage.setItem("role", role);
  }

  public saveLogin(login:any):void{
    window.sessionStorage.removeItem("login");
    window.sessionStorage.setItem("login", login);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem("token");
  }
  public getRole(): any {
    return window.sessionStorage.getItem("role");
  }

  public getLogin(): any {
    return window.sessionStorage.getItem("login");
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
