import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/firestore';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.page.html',
  styleUrls: ['./detailproduct.page.scss'],
})
export class DetailproductPage implements OnInit {
  id_product:any;
  variavel:any []=[];

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.id_product = this.navParams.get('id_product');
    console.log(this.id_product);
    this.getDetails();
  }
  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  async getDetails(){
    let dbProducts = this.db.firestore.collection(`products`).doc(this.id_product);
    await dbProducts.get().then(function(doc) {
      if (doc.exists) {
          var invoice = doc.data(); 
          console.log('Invoice data: ', doc.data());
      } else {
          console.error('No matching invoice found');
      }
    });
  }

}
