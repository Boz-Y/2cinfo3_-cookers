import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public routes = routes;
  public Toggledata = false;

  role:any;
  form: any = {
    firstname:null,
    lastname: null,
    phone:null,
    mail: null,
    password: null,
    role:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService:AuthService,private toastr :ToastrService,private router :Router,private spinner :NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const roleSelected =document.getElementById('role') as HTMLSelectElement;
    const roleValue=roleSelected.value;
    this.form.role=[roleValue];

    const { name,firstname,cin,phoneNumber,email,role } = this.form;

    this.authService.register(name,firstname,cin,phoneNumber,email,role).subscribe(
       data => {
         console.log(data);
         this.spinner.show();
         this.toastr.success('Utilisateur : '+this.form.firstname+' '+this.form.name+' ajouté avec succés','Authentification avec succés!');
         this.router.navigate([""]);
         setTimeout(() => {
           this.spinner.hide();
         }, 2000);


       },
        err => {
              this.errorMessage = err.error.message;
              console.log(err.error);
              this.toastr.error(this.errorMessage, 'Error!');
        }
      );
  }
  
  path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
   }
  
}
