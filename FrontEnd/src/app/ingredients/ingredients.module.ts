import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { IngredientsComponent } from './ingredients.component';
import { IngredientsService } from '../service/ingredients/ingredients.service';
import { SharedModule } from '../shared/shared/shared.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';




@NgModule({
  declarations: [
    IngredientsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    IngredientsRoutingModule
  ],
  providers: [
    IngredientsService
  ],
})
export class IngredientsModule { }
