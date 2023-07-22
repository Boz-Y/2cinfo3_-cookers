import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plat } from 'app/Entity/plat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(private _http: HttpClient) { }




  addPlat(data: any): Observable<Plat> {
    return this._http.post<Plat>('http://localhost:9090/plats/AddPlats',data)
  }

  updatePlat(id: number, data: any){
    return this._http.put<Plat>(`http://localhost:9090/plats/${id}`, data);
  }

  getPlatList() {
    return this._http.get<Plat[]>('http://localhost:9090/plats/')
    
  }

  // getPlatList() {
  //   let data = "";
  //   var result = this._http.get<any>('http://localhost:9090/plats/');
  //   return result;
  //   }

  deletePlat(id: number) {
    return this._http.delete<Plat>(`http://localhost:9090/plats/${id}`);
  }

  getbyid(id: number) {
    return this._http.get<Plat>(`http://localhost:9090/plats/${id}`);
  }
}
