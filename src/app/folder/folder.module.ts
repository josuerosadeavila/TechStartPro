import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { RouterModule } from '@angular/router';
import { NewproductPageModule } from 'src/app/pages/newproduct/newproduct.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //NewproductPageModule,
    FolderPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: FolderPage
      }
    ]),
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
