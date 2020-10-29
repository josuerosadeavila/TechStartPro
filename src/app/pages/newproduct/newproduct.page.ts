import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/firestore';
import { ConditionalExpr } from '@angular/compiler';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.page.html',
  styleUrls: ['./newproduct.page.scss'],
})
export class NewproductPage implements OnInit {

  name: any [] =[];
  id: any [] = [];
  category:any;
  productname:string;
  description: string;
  price:number;
  number: number;
  newprod: boolean;
  check0:boolean;


  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private db : AngularFirestore,
    private alert: AlertController,
    //private fp: FolderPage,
  ) { }

  ngOnInit() {
    this.getCategories();
  
  }

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

  async getCategories(){
 
    let dbCategories = this.db.firestore.collection(`categories`);

    await dbCategories.get().then((querySnapshot) => {
     
        for(let i=0;querySnapshot.docs.length;i++){
          this.name[i] = querySnapshot.docs[i].data().name;
          this.id[i] = querySnapshot.docs[i].id;
          console.log(this.name[i]);
          //this.areCategories = true;
          }   
  });

  }

  async save(){

      var matches = this.category.match(/\d+$/);

      if(matches){
        this.number = matches[0];
      }
 
      await this.db.collection('products').add({
      name: this.productname,
      description: this.description,
      price: "R$ " + this.price,
      id_category : this.id[this.number]
      });
      this.voltarClicked();
      this.presentAlert("Success!","Product added");
      
           
    
  }
}