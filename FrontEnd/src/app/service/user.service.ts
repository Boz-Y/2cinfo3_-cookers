
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {User} from "../Models/user";
import { catchError } from 'rxjs/operators';


const API_URL = 'http://127.0.0.1:9090/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

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
