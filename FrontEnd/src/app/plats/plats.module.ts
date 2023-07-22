import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PlatsComponent } from './plats.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PlatService } from '../service/plats/plats.service';



@NgModule({
  declarations: [
    PlatsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    PlatService
  ],
})
export class PlatsModule { }
