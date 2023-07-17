import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from 'app/service/evenement/evenement.service';

@Component({
  selector: 'app-evenement-update',
  templateUrl: './evenement-update.component.html',
  styleUrls: ['./evenement-update.component.scss']
})
export class EvenementUpdateComponent implements OnInit {
  nom: string;
  description: string;
  date_debut: Date;
  date_fin: Date;
  date_fin_vote: Date;
  nb_participant: Number;
  prix_reduction: Number;



  constructor(private route: ActivatedRoute,private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      var _id = params.get('_id');
        
      this.evenementService.getEventById(_id).subscribe({
        next: (result) => {
          this.nom = result.data.nom;
          this.description = result.data.description;  
          console.log(result.data.nom)
          console.log(result.data.description)
          console.log(this.nom)
          console.log(result.data.description)
         // this.date_debut = result.data.date_debut
        },
        error: (error) => console.log(error),   
      });
    });
  }
  
}
