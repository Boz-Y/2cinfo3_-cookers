import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from '../../service/auth.service';
import { AuthInterceptor } from '../../helpers/auth.interceptor';
import { TokenStorageService } from '../../service/token-storage.service';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
declare const gapi: any; // Declare the `gapi` object 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  registerForm:any = FormGroup;
  submitted = false;
  usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
  public routes = routes;
  public Toggledata = false;
  username: any;
  password: any;
  

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private authInterceptor: AuthInterceptor, private tokenStorage: TokenStorageService,private router:Router) {
 
   }
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
      password: ['', [Validators.required]]
    });

    this.loadGoogleSignInClient();
  }

  path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
  
  }
 
  onSubmit() {
    this.submitted = true;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  
   // Get form values using the registerForm controls
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.authService.signin(this.username, this.password).subscribe(
      (user) => {
        // Connexion réussie : sauvegardez le token dans le localStorage ou utilisez une solution de gestion de l'état (ex: Redux)
        this.authInterceptor.saveToken(user.token);
        this.authInterceptor.saveUser(user);
        this.authInterceptor.saveLogin(user.username);
        this.authInterceptor.saveID(user.id);
        alert("Login Successfully");
        this.router.navigate([routes.profile])
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

  // auth2 is initialized with gapi.auth2.init() and a user is signed in.



  }
