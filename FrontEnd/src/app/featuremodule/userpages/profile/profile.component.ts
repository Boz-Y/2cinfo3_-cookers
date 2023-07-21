import { Component , OnInit} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;

public routes=routes;
public Toggledata = false;
public Toggle = false;

constructor(private route: ActivatedRoute, private userService: UserService
) {}

iconLogle() {
  this.Toggledata = !this.Toggledata;
 

}
icon(){
  this.Toggle = !this.Toggle;
}
  

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserProfile(userId).subscribe(
      (user) => {
        this.user = user;
        console.log(userId);
      },
      (error) => {
        console.log(userId);
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      }
    );
  }
}
