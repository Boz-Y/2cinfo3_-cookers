import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import * as AOS from 'aos';
import { MatTableDataSource } from '@angular/material/table';
import { SpecialiteService } from 'src/app/service/specialite/specialite.service';
import { Specialite } from 'src/app/Models/specialite/specialite';
import { PlatService } from 'src/app/service/plats/plats.service';
import { Plat } from 'src/app/Models/plats/plat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  public routes = routes;
  public categories: any = [];
  specialites!: Specialite[];
  plats!: Plat[];

  selectedSpecialite: Specialite | null = null; // Initialisez selectedSpecialite à null

  categoriesDataSource = new MatTableDataSource();
  searchInputCategory: any;
  selectedCategory: any = '';
  public  peopleFeedback: any = [];

  constructor(private DataService: DataService, public router: Router, private specialiteService: SpecialiteService, private platService: PlatService){
    this. peopleFeedback = this.DataService. peopleFeedback,
    (this.categories = this.DataService.categoriesList),

    (this.categoriesDataSource = new MatTableDataSource(this.categories));
  }


  public  peopleFeedbackOwlOptions: OwlOptions = {
    margin: 24,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    navSpeed: 700,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0:{
        items:1
      },
      768:{
        items:3
      },
      1170:{
        items:3,
        loop:true
      }
    },
    nav:false,
  };
  ngOnInit(): void {
    AOS.init({disable:'mobile'}
    );

    this.getSpecialites();

  }
  searchCategory(value: any): void {
    const filterValue = value;
    this.categoriesDataSource.filter = filterValue.trim().toLowerCase();
    this.categories = this.categoriesDataSource.filteredData;
  }

  getSpecialites(): void {
    this.specialiteService.getSpecialiteList()
      .subscribe(
        (data) => {
          this.specialites = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des spécialités :', error);
        }
      );
      }

  getSpecialityImageUrl(specImg: string): string {
    return `http://localhost:9090/img/${specImg}`;
  }

  showPlats(specialite: Specialite): void {
    this.platService.getPlatsBySpeciality(specialite._id).subscribe(
      (plats) => {
        specialite.plats = plats;
        this.selectedSpecialite = specialite;
      },
      (error) => {
        console.error('Erreur lors de la récupération des plats :', error);
      }
    );
  }

}
