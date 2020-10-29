import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriesService } from './categories.service';
import { AlertController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  id_product:any []=[];
  productname:any []=[];
  description:any []=[];
  price:any []=[];
  id_category:any []=[];
  areProducts :boolean;
  filtername:any []=[];
  aux:any []=[];

  detail_id_product:any;
 
  detail_productname:string;
  detail_description:any;
  detail_price:any;
  detail_id_category:any;


  constructor(
    private db: AngularFirestore,
    private categoriesService: CategoriesService,
    private alert: AlertController,
  ) { }

  //get products data 
  async getProducts(){
    let dbProducts = this.db.firestore.collection(`products`);
    await dbProducts.get().then((querySnapshot) =>{

      for(let i=0;querySnapshot.docs.length;i++){
        this.id_product[i] = querySnapshot.docs[i].id;
        this.productname[i] = querySnapshot.docs[i].data().name;
        this.description[i] = querySnapshot.docs[i].data().description;
        this.price[i] = querySnapshot.docs[i].data().price;
        this.id_category[i] = querySnapshot.docs[i].data().id_category;
        this.areProducts = true;
        this.filtername[i] = this.productname[i];
        console.log(this.filtername[i]);
      }
      
    });
    this.areProducts = false;
  }

  //listen to search envents
  async onInput(evt){
       
    const searchTerm = evt.srcElement.value; 
   console.log(searchTerm);

    for(let i=0;this.productname[i];i++){
      if(this.productname[i].includes(searchTerm) || 
      this.price[i] == searchTerm || 
      this.id_product[i]==searchTerm ||
      this.id_category[i] == searchTerm ||
      this.categoriesService.name[i].includes(searchTerm) ||
      this.description[i] ==searchTerm
      ){

        this.aux[i] = this.productname[i]

      }else{
        this.aux[i] = null;
      }
    }
    var filtered = this.aux.filter(function (element) {
      return element != null;
    });
    this.filtername = filtered;
    }

}
