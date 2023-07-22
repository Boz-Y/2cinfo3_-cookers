import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import {AuthService} from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthInterceptor}  from '../../helpers/auth.interceptor';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public routes = routes;
  public Toggledata = false;
//Form Validables 
registerForm:any = FormGroup;
submitted = false;
usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
  username: any;
  email:any;
  password: any;


  constructor(private formBuilder: FormBuilder,private authInterceptor: AuthInterceptor,private authService: AuthService,private router :Router) {}
   get f() { return this.registerForm.controls; }
  
   path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
   }

     ngOnInit() {
       //Add User form validations
       this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required]]
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
      this.password = this.registerForm.value.password;
    
      this.authService.signup(this.username, this.email, this.password).subscribe(
        (response) => {
          alert("Votre Compte est créé avec succes, Confirmation de mail est envoyé à l'Admin");
          this.router.navigate([routes.login]);
          // Log de statut de succès
          alert("User registration successful. Confirmation email sent to admin.");
        },
        (error) => {
          console.error(error);
          // Vérifiez le statut de la réponse HTTP
          if (error.status === 401) {
            // Gérez les erreurs d'authentification ici (mauvais mot de passe, compte bloqué, etc.)
            console.log('Authentication failed: Invalid username or password');
          } else if (error.status === 404) {
            console.log('Authentication failed: User not found');
          } else if (error.status === 500) {
            console.log('Internal server error');
          } else {
            console.log('Unknown error occurred');
          }
        }
      );
    }
    
  }