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


  // ...

  getPlatList(): Observable<Plat[]> {
    return this._http.get<Plat[]>("http://localhost:9090/plats/");
  }



  // private removeDuplicates(plats: Plat[]): Plat[] {
  //   // Use a Set to keep track of unique plats based on their unique identifier (e.g., platId).
  //   const uniquePlats = new Set<string>();
  //   const uniquePlatsArray: Plat[] = [];

  //   for (const plat of plats) {
  //     // Assuming your Plat model has a unique identifier 'platId', replace it with the actual property name if different.
  //     const platId = plat._id;

  //     // Check if the platId is already in the Set. If not, add the plat to the array of uniquePlatsArray.
  //     if (!uniquePlats.has(platId)) {
  //       uniquePlats.add(platId);
  //       uniquePlatsArray.push(plat);
  //     }
  //   }

  //   return uniquePlatsArray;
  // }

}
