import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { UserService  } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../Models/user';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public routes = routes;
  public Toggledata = false;
  
  constructor( public router:Router) {}

  // ngOnInit() {
  //   this.userForm = this.formBuilder.group({
  //     firstname: ['', Validators.required],
  //     lastname: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.userForm.valid) {
  //     const formData = this.userForm.value;
  //     console.log(formData); // Output the form data
  //   }
  // }
  
  path(){
    this.router.navigate([routes.login])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
   
   }
  
}
