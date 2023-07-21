
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {User} from "../Models/user";
import { catchError } from 'rxjs/operators';


const API_URL = 'http://127.0.0.1:9090/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='http://127.0.0.1:9090/user';

  constructor(private httpClient: HttpClient,private http: HttpClient) { }

  forget(email: string): Observable<User> {
    const credentials = { email };
    return this.http.post<User>(API_URL+'/forgotPassword', credentials);
  }
  
  getUserProfile(userId: string): Observable<User> {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    if (!token) {
      throw new Error('No token provided!'); // Handle the case where the token is missing or invalid
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/users/profiles/${userId}`;

    return this.http.get<User>(url, { headers });
  }

  
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL+'/all')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findUserById(id:any): Observable<User> {
    return this.httpClient.get<User>(API_URL+ id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteUser(id:any){
    return this.httpClient.delete(API_URL+'/delete/'+ id,{responseType: 'text'})
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateUser(id:any, user:any): Observable<User> {
    return this.httpClient.put<User>(API_URL+'/UpdateUser/'+ id, user)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
