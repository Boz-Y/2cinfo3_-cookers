import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

declare const gapi: any; // Declare the `gapi` object

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public routes = routes;
  public Toggledata = true;

  constructor(public router: Router) {
    
  }

  path() {
    this.router.navigate([routes.dashboard]);
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }

  // Load the `gapi` library asynchronously
  loadGapi() {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';

      script.onload = () => {
        gapi.load('auth2', () => {
          resolve();
        });
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google API client library.'));
      };

      document.head.appendChild(script);
    });
  }

  // Usage example
  async initializeAuth() {
    await this.loadGapi(); // Wait for the library to load

    // Initialize the `gapi.auth2` module
    await gapi.auth2.init({
      client_id: '781943891006-ctdghgsrl5rq7g8eumkrcrjfnoq8pq0t.apps.googleusercontent.com',
    });

    // Now you can use the `gapi.auth2` module
    const authInstance = gapi.auth2.getAuthInstance();
    // ...
  }

  ngOnInit() {
    this.initializeAuth();
  }
}
