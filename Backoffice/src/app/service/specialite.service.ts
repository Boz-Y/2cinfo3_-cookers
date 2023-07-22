import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialite } from 'app/Entity/specialite';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private _http: HttpClient) {}

  addSpecialite(data: any): Observable<Specialite> {
    return this._http.post<Specialite>('http://localhost:9090/specialites/AddSpecialite',data)
  }

  updateSpecialite(id: number, data: any){
    return this._http.put<Specialite>(`http://localhost:9090/specialites/${id}`, data);
  }

  getSpecialiteList(){
    return this._http.get<Specialite[]>('http://localhost:9090/specialites/');
  }

  deleteSpecialite(id: number) {
    return this._http.delete<Specialite>(`http://localhost:9090/specialites/${id}`);
  }


}
