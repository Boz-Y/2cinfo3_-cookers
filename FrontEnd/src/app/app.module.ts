import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PlatsModule } from './plats/plats.module';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    IngredientsModule,
    PlatsModule,
    MaterialModule,
    SharedModule,
    BsDatepickerModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
