import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/Models/plats/plat';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { PlatService } from 'src/app/service/plats/plats.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.css']
})
export class ListingGridComponent implements OnInit{
  public routes=routes;
  public Bookmark :any =[];
  plats!: Plat[];

  constructor(private Dataservice:DataService , private platservice: PlatService){
    this.Bookmark=this.Dataservice.bookmarkList

  }

  ngOnInit(): void {
    this.getPlats()
  }

  getPlats(): void {
    this.platservice.getPlatList().pipe(
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(
      (data) => {
        console.log("Réponse du backend :", data);
        this.plats = data;
        console.log("Plats après suppression des doublons :", this.plats);
      },
      (error) => {
        console.error('Erreur lors de la récupération des plats:', error);
      }
    );
  }


  // private removeDuplicates(plats: Plat[]): Plat[] {
  //   const uniquePlats = new Set<string>();
  //   const uniquePlatsArray: Plat[] = [];

  //   for (const plat of plats) {
  //     const platId = plat._id;

  //     // Check if the platId is already in the Set. If not, add the plat to the array of uniquePlatsArray.
  //     if (!uniquePlats.has(platId)) {
  //       uniquePlats.add(platId);
  //       uniquePlatsArray.push(plat);
  //     }
  //   }

  //   return uniquePlatsArray;
  // }


  getPlatImageUrl(images: string): string {
    return `http://localhost:9090/img/${images}`;
  }

}
