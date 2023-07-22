import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Plat } from '../../Models/plats/plat';

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



  deletePlat(id: number) {
    return this._http.delete<Plat>(`http://localhost:9090/plats/${id}`);
  }

  getbyid(id: number) {
    return this._http.get<Plat>(`http://localhost:9090/plats/${id}`);
  }

  getPlatsBySpeciality(specialityId: number): Observable<Plat[]> {
    return this._http.get<Plat[]>(`http://localhost:9090/plats/speicalite/${specialityId}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des plats :', error);
        return []; // Retourne un tableau vide en cas d'erreur pour éviter l'exception
      })
    );
  }

  getPlatList(): Observable<Plat[]> {
    return this._http.get<Plat[]>("http://localhost:9090/plats/").pipe(
      map((plats: Plat[]) => this.removeDuplicates(plats))
    );
  }

  private removeDuplicates(plats: Plat[]): Plat[] {
    const uniquePlats: Plat[] = [];
    const platIds: number[] = [];

    for (const plat of plats) {
      if (!platIds.includes(plat._id)) {
        uniquePlats.push(plat);
        platIds.push(plat._id);
      }
    }

    return uniquePlats;
  }

}
