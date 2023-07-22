import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../../service/user.service';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule, // Assurez-vous que FormsModule est importé ici
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
  ],
})
export class ProfileModule { }
