import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from '../../service/auth.service';
import { AuthInterceptor } from '../../helpers/auth.interceptor';
import { TokenStorageService } from '../../service/token-storage.service';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';

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

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private authInterceptor: AuthInterceptor, private tokenStorage: TokenStorageService,private router:Router,private toastr: ToastrService,private spinner:NgxSpinnerService) { }
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
      password: ['', [Validators.required]]
    });
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
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
        this.tokenStorage.saveLogin(user.username);
        this.router.navigate([routes.dashboard])
        // Redirigez l'utilisateur vers la page appropriée après la connexion réussie.
        // Exemple : window.location.href = '/dashboard';
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
