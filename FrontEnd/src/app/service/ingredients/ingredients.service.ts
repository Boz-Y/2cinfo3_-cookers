import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/Models/ingredients/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private _http: HttpClient) {}

  addIngredient(data: any): Observable<Ingredient> {
    return this._http.post<Ingredient>('http://localhost:9090/ingredients/AddIngredients',data)
  }

  updateIngredient(id: number, data: any){
    return this._http.put<Ingredient>(`http://localhost:9090/ingredients/${id}`, data);
  }

  getIngredientList(){
    return this._http.get<Ingredient[]>('http://localhost:9090/ingredients/');
  }

  deleteIngredient(id: number) {
    return this._http.delete<Ingredient>(`http://localhost:9090/ingredients/${id}`);
  }



}
