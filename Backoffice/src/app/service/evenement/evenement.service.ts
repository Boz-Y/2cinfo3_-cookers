import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'app/Entity/event';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  apiUrl: string = "http://localhost:9090/event";
  constructor(private http:HttpClient) { }

 getEvent() {
  let data = "";
  var result = this.http.post<any>(this.apiUrl,data);
  return result;
  }

  getEventById(id:String) {
    const apiUrl = `${this.apiUrl}/${id}`; 
     return this.http.get<any>(apiUrl);
    }

  addEvent(
    user_createur: string,
    nom: string,
    description: string,
    date_debut: Date,
    date_fin: Date,
    date_fin_vote: Date,
    nb_participant: Number,
    prix_reduction: Number,
    images: File[]
  ) {
    const formData: FormData = new FormData();
    formData.append('user_createur', user_createur);
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('date_debut', date_debut.toString());
    formData.append('date_fin', date_fin.toString());
    formData.append('date_fin_vote', date_fin_vote.toString());
    formData.append('nb_participant', nb_participant.toString());
    formData.append('prix_reduction', prix_reduction.toString());
    if(images ! =null){
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    
    }

    return this.http.post<Event>(`${this.apiUrl}/add`, formData);
  }
  
}
