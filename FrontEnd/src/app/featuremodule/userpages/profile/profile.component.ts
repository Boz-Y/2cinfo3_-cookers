import { Component , OnInit} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { User } from '../../../Models/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthInterceptor}  from '../../../helpers/auth.interceptor';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  id: string = '';
public routes=routes;
public Toggledata = false;
public Toggle = false;
//Form Validables 
registerForm:any = FormGroup;
submitted = false;
usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
username: any;
email:any;

constructor(private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private authService: AuthService, private userService: UserService,private authInterceptor : AuthInterceptor) {
 
}
get f() { return this.registerForm.controls; }
  
path(){
  this.router.navigate([routes.login])
}
iconLogle() {
  this.Toggledata = !this.Toggledata;
 
 }

icon(){
  this.Toggle = !this.Toggle;
}
  

ngOnInit() {
  
  const id = localStorage.getItem("id");
  
  if (id !== null) {

    this.userService.getUserProfile(id).subscribe(
      (user) => {
        this.user = user;
        console.log(id);
      },
      (error) => {
        console.log(id);
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      }
    );
  } else {
    // Handle the case when 'id' is not found in localStorage
    console.error("ID not found in localStorage.");
  }

  //Add User form validations
  this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
   email: ['', [Validators.required, Validators.email]],
   });
   
}
onSubmit() {
  this.submitted = true;

  // Stop here if form is invalid
  if (this.registerForm.invalid) {
    return;
  }

  // All fields are filled and form is valid, proceed with the form submission
  this.username = this.registerForm.value.username;
  this.email = this.registerForm.value.email;

  const userData = {
    username: this.username,
    email: this.email
    // Autres propriétés à mettre à jour...
  };
  const id = localStorage.getItem("id");
  if (id !== null) {
  this.userService.updateUserProfile(id, userData).subscribe(
    (updatedUser) => {
      this.user = updatedUser;
      console.log('Profil utilisateur mis à jour avec succès:', updatedUser);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du profil utilisateur :', error);
    }
  );
} else {
  // Handle the case when 'id' is not found in localStorage
  console.error("ID not found in localStorage.");
}
}

signout() {
  this.authService.signout().subscribe(
    (response) => {
      console.log("Logged Out");
      // Perform any additional actions after successful signout
      this.authInterceptor.removeToken(); 
      this.router.navigate([routes.login]);// Remove the token and end the session
    },
    (error) => {
      console.error('Error signing out:', error);
      // Handle error appropriately
    }
  );
}

}
