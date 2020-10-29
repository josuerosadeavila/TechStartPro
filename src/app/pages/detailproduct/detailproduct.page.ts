import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.page.html',
  styleUrls: ['./detailproduct.page.scss'],
})
export class DetailproductPage implements OnInit {
  id_product:any;
  productname:string;
  description:any;
  price:any;
  id_category:any;
  editproduct:boolean;
  name: any [] =[];
  id: any [] = [];
  category:any;
  number: number;
  ex:boolean;
  categoryname:any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private db: AngularFirestore,
    private alert: AlertController, 
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.id_product = this.navParams.get('id_product');
    console.log(this.id_product);
    this.editproduct = false;
    this.getProductDetails();
  }
 
  voltarClicked() {
    this.modalCtrl.dismiss();
  }
  
  //Get product infomation from databse colection
  async getProductDetails(){
    const snapshot = await this.db.firestore.collection('products').doc(this.id_product).get();
    const id = snapshot.id;
    const name = snapshot.data().name;
    const desc = snapshot.data().description;
    const price = snapshot.data().price;
    const cate = snapshot.data().id_category;   

  return this.ParseProduct(id,name,desc,price,cate);
   }

   //parse product data to local variables
   ParseProduct(id,data,desc,price,cate){
    this.id_product = id;
    this.productname = data;
    this.description = desc;
    this.id_category = cate;
    this.price = price;

    this.getCategoryDetails(this.id_category);
   }
   //get details from a single and specific category of products
   async getCategoryDetails(category){
    const snapshot = await this.db.firestore.collection('categories').doc(category).get();
    const categoryname = snapshot.data().name;
    
    return this.ParseCategory(categoryname)
   }

   ParseCategory(categoryname){
    this.categoryname = categoryname;
   }

   //control what is displayed on html page and get categories data
   editPopUp(){
     this.editproduct = true;
     this.categoriesService.getCategories();
   }

   //update product data to database
   async updateProduct(){
    var matches = this.categoriesService.category.match(/\d+$/);
    if(matches){
      this.number = matches[0];
    }

    await this.db.collection('products').doc(this.id_product).update({
    name: this.productname,
    description: this.description,
    price: this.price,
    id_category : this.categoriesService.id[this.number]
    });
    this.voltarClicked();
    this.presentAlert("Success!","Product updated. Please, refesh page to update.");
   }

   async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

}
