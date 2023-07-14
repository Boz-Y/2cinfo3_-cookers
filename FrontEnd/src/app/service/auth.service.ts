
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://127.0.0.1:9090/'; // Remplacez cette valeur par l'URL de votre API

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  forgetPass(user: any) {
    return this.http.post(`${this.apiUrl}/forget-password`, user);
  }
}
