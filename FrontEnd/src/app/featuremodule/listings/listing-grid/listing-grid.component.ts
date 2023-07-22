import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/Models/plats/plat';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { PlatService } from 'src/app/service/plats/plats.service';

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
    this.platservice.getPlatList()
      .subscribe(
        (data) => {
          this.plats = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des spécialités :', error);
        }
      );
      }

  getPlatImageUrl(images: string): string {
    return `http://localhost:9090/img/${images}`;
  }

}
