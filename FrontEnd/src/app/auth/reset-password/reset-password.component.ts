import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

import {AuthService} from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public routes = routes;
  password: any;
  
  public Toggledata = false;
//Form Validables 
registerForm:any = FormGroup;
submitted = false;


  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router :Router) {}
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
      password: ['', [Validators.required, Validators.email]],
    });
  }


  onResetPassword() {

    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  
    this.password = this.registerForm.value.password;
    this.authService.forget(this.password).subscribe(
      (response) => {
        this.router.navigate([routes.forgotpassword]);
        console.log('Password reset email sent successfully.');
        // Vous pouvez rediriger l'utilisateur vers une page de succès ou afficher un message de réussite ici.
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

  direction(){
    this.router.navigate([routes.login])
  }

  }
 
