import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewproductPageRoutingModule } from './newproduct-routing.module';

import { NewproductPage } from './newproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewproductPageRoutingModule
  ],
  declarations: [NewproductPage]
})
export class NewproductPageModule {}
