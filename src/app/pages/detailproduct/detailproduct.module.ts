import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailproductPageRoutingModule } from './detailproduct-routing.module';

import { DetailproductPage } from './detailproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailproductPageRoutingModule
  ],
  declarations: [DetailproductPage]
})
export class DetailproductPageModule {}
