import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings.component';

const routes: Routes = [
  { path: '', component: ListingsComponent,children:[ {
    path: 'listing-grid',
    loadChildren: () =>
      import('./listing-grid/listing-grid.module').then(
        (m) => m.ListingGridModule
      ),
  },

  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
