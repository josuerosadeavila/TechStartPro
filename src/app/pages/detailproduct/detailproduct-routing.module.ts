import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailproductPage } from './detailproduct.page';

const routes: Routes = [
  {
    path: '',
    component: DetailproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailproductPageRoutingModule {}
