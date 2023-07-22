import { PlatService } from '../service/plat.service';
import { Component, OnInit } from '@angular/core';
import { Plat } from '../Entity/plat';
@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styleUrls: ['./plat-list.component.css']
})
export class PlatListComponent implements OnInit {


  plats!: Plat[];


  constructor(
    private _platService: PlatService,

  ) {}

  ngOnInit(): void {
    // this._platService.getPlatList().subscribe({
    //   next: (result) => (this.listPlat = result.data),
    //   error: (error) => console.log(error),
    //   complete: () => console.log(this.listPlat)
    // });

    this.getPlats()
  }


  getPlats(): void {
    this._platService.getPlatList()
      .subscribe(
        (data) => {
          this.plats = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des plats :', error);
        }
      );
      }

      getPlatImageUrl(images: string): string {
        return `http://localhost:9090/img/${images}`;
      }


}
