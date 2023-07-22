import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from 'app/service/specialite.service';

@Component({
  selector: 'app-specialite-add',
  templateUrl: './specialite-add.component.html',
  styleUrls: ['./specialite-add.component.scss']
})
export class SpecialiteAddComponent implements OnInit {

  name: string;
  description: string;
  specImg:File;

  

  constructor(private specService: SpecialiteService) { }


  ngOnInit(): void {
  }

  add() {
    // Créer un objet pour représenter l'événement à ajouter
    const nouvelEvenement = {
      name: this.name,
      description: this.description,
      specImg: this.specImg,

    };

    // Appeler le service pour ajouter l'événement
    this.specService.addSpecialite(nouvelEvenement).subscribe(
      (response) => {
        console.log('specialite ajoutée avec succès !');
        // Vous pouvez également ajouter du code pour effectuer une action après l'ajout réussi, par exemple, rediriger vers une autre page.
      },
      (error) => {
        console.log(nouvelEvenement)
        console.error('Erreur lors de l\'ajout de la specialite :', error);
        // Gérer les erreurs ici si nécessaire.
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.specImg = file; // Affecter le fichier sélectionné à la propriété specImg.

    // Si vous souhaitez afficher le nom du fichier sélectionné dans la console pour vérification, vous pouvez utiliser :
    console.log('Fichier sélectionné:', this.specImg.name);
  }

}
