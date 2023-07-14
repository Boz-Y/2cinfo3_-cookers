import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

declare const FB: any; // Declare the `FB` object
declare const gapi: any; // Declare the `gapi` object

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,  AfterViewInit {
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
  ngAfterViewInit() {
    this.loadFacebookSDK();
  }

  loadFacebookSDK() {
    // Load the Facebook SDK asynchronously
    (function(d: Document, s: string, id: string) {
      var js: HTMLScriptElement, fjs: HTMLElement = d.getElementsByTagName(s)[0] as HTMLElement;
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement; js.id = id;
      js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v17.0&protocol=https";
      if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));
  }
  

  onFacebookLogin() {
    // Handle Facebook login event
    FB.login(function(response: any) {
      if (response.authResponse) {
        // User is logged in and authorized
        // Perform any desired actions
      } else {
        // User cancelled the login process
        // Handle accordingly
      }
    });
  }

}

