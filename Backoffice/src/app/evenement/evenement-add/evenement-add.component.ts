import { Component, OnInit } from '@angular/core';
import { Event } from 'app/Entity/event';
import { EvenementService } from 'app/service/evenement/evenement.service';
import {  Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.scss']
})
export class EvenementAddComponent implements OnInit {

  nom: string;
  description: string;
  date_debut: Date;
  date_fin: Date;
  date_fin_vote: Date;
  nb_participant: Number;
  prix_reduction: Number;
  images:File[];


  constructor(private evenementService: EvenementService,private router:Router) { }

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
  }

  add(){
    /// TODO Add user createur from user connected
    this.evenementService.addEvent("64a4a00ebc58419d66afea0e",this.nom,this.description,this.date_debut,this.date_fin,this.date_fin_vote,this.nb_participant,this.prix_reduction,this.images).subscribe({
      next: (data) => (this.router.navigateByUrl('/evenement')),
      error: (error) => console.log(error),
      complete: () => console.log("I have finished")
    });
  }

  onFileSelected(): void {
    const files: FileList | null = this.fileInput.nativeElement.files;
    if (files && files.length > 0) {
      this.images = Array.from(files);
    } else {
      this.images = []; // Clear the images array if no files are selected
    }
  }

}
