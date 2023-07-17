import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public routes = routes;
  public Toggledata = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router,private toastr: ToastrService,private spinner:NgxSpinnerService) { }

  
  path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
  
  }

  form: any = {
    mail: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveLogin(data.login);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.roles = this.tokenStorage.getUser().roles;
        this.tokenStorage.saveRole(this.roles);

        this.spinner.show();
        this.router.navigate(["home"]);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.toastr.success('Bienvenue '+data.login+' !', 'Authentification avec succés!');
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Error!');
        this.isLoginFailed = true;
      }
    );
  }

}

