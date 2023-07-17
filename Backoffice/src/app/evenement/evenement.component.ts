import { Component, OnInit } from '@angular/core';
import { Event } from 'app/Entity/event';
import { EvenementService } from 'app/service/evenement/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  listEvent: any[] = [];
  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.evenementService.getEvent().subscribe({
      next: (result) => (this.listEvent = result.data),
      error: (error) => console.log(error),
      complete: () => console.log(this.listEvent)
    });
  }

}
