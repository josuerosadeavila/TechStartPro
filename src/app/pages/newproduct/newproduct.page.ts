import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.page.html',
  styleUrls: ['./newproduct.page.scss'],
})
export class NewproductPage implements OnInit {

  name: any[] = [];
  id: any[] = [];
  category: any;
  productname: string;
  description: string;
  price: number;
  number: number;
  newprod: boolean;
  check0: boolean;


  constructor(
    private modalCtrl: ModalController,
    private db: AngularFirestore,
    private alert: AlertController,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit() {
    //get categories do create option's chechboxs
    this.categoriesService.getCategories();

  }
  //display warnings, comunicate with user
  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  //save product infomation to database
  async saveProductS() {
    var matches = this.categoriesService.category.match(/\d+$/);

    if (matches) {
      this.number = matches[0];
    }

    await this.db.collection('products').add({
      name: this.productname,
      description: this.description,
      price: this.price,
      id_category: this.categoriesService.id[this.number]
    });
    this.voltarClicked();
    this.presentAlert("Success!", "Product added. Please, refesh the page to update.");
  }
}