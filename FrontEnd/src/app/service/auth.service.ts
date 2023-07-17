
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:9090/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(mail: any, password: any): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      mail,
      password
    }, httpOptions);
  }

  register(firstname:any,lastname:any,phone:any,mail:any,password:any,role:any): Observable<any> {
    return this.http.post(AUTH_API + '/register', {
    
      firstname,
      lastname,
      phone,
      mail,
      password,
      role
    }, httpOptions);
  }
}
