import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  User: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (result) => (this.User ),
      error: (error) => console.log(error),
      complete: () => console.log(this.User)
    });
  }

}
