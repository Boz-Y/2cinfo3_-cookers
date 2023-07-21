
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Signup } from '../Models/signup';

const AUTH_API = 'http://127.0.0.1:9090/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signin(username: string, password: string): Observable<User> {
    const credentials = { username, password };
    return this.http.post<User>(AUTH_API+'/signin', credentials);
  }
  
  signup(username: string,email: string, password: string): Observable<Signup> {
    const credentials = { username, email,password };
    return this.http.post<Signup>(AUTH_API+'/signup', credentials);
  }
  
  

  forget(email: string): Observable<User> {
    const credentials = { email };
    return this.http.post<User>(AUTH_API+'/forgotPassword', credentials);
  }
  
}
