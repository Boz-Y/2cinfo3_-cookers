import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EvenementAddComponent } from './evenement/evenement-add/evenement-add.component';
import { MatInputModule } from '@angular/material/input';
import { EvenementUpdateComponent } from './evenement/evenement-update/evenement-update.component';
import {AuthService} from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { PlatListComponent } from './plat-list/plat-list.component';
import { SpecialiteAddComponent } from './speciality-list/specialite-add/specialite-add.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    EvenementComponent,
    EvenementAddComponent,
    EvenementUpdateComponent,
    UsersComponent,
    SpecialityListComponent,
    PlatListComponent,
    SpecialiteAddComponent,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
