import { Component, OnInit } from '@angular/core';
import { Specialite } from 'app/Entity/specialite';
import { SpecialiteService } from 'app/service/specialite.service';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements OnInit {
  specialites!: Specialite[];

  constructor( private specservice: SpecialiteService) { }

  ngOnInit(): void {
    this.getSpeciality()
  }

  getSpeciality(): void {
    this.specservice.getSpecialiteList()
      .subscribe(
        (data) => {
          this.specialites = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des specialités :', error);
        }
      );
      }

      getPlatImageUrl(images: string): string {
        return `http://localhost:9090/img/${images}`;
      }

}
