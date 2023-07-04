import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

declare const gapi: any; // Declare the `gapi` object

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loadGoogleSignInClient();
  }
  public routes = routes;
  public Toggledata = false;

  constructor(public router:Router){
    
  }
  path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
  
  }

  loadGoogleSignInClient(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // The Google Sign-In client script has been loaded
      this.initializeGoogleSignIn();
    };
  }

  initializeGoogleSignIn(): void {
    // Initialize the Google Sign-In client
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '781943891006-ctdghgsrl5rq7g8eumkrcrjfnoq8pq0t.apps.googleusercontent.com'
      }).then(() => {
        console.log('Google Sign-In client initialized.');
        // You can now use the Google Sign-In client methods
      }).catch((error: any) => {
        console.error('Error initializing Google Sign-In client:', error);
      });
    });
  }

  // Other component methods and code...

}

