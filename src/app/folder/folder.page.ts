
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AngularFirestore } from  '@angular/fire/firestore';
import {CategoriesService} from"src/app/services/categories.service";
import { ModalController, Platform, NavParams } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Categories } from 'src/app/models';
import { NewproductPage } from 'src/app/pages/newproduct/newproduct.page';
import { BoundElementProperty, createOfflineCompileUrlResolver } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';
import { DetailproductPage } from '../pages/detailproduct/detailproduct.page';
import { runInThisContext } from 'vm';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  header = false;
  areCategories: boolean;
  areProducts:boolean;
  categories: Categories []=[];
  name: any [] =[];
  id: any [] = [];
  productname: string [] =[];
  description:any [] = [];
  price:any [] = [];
  id_category:any [] = [];
  id_product:any [] = [];
  ex:boolean;
  search: string;
  top:any []=[];
  filtername:any []=[];
  aux:any []=[];
 
  constructor(private activatedRoute: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser,
    private db: AngularFirestore,
    private categoriesService: CategoriesService,
    private alert: AlertController,
    private modalController: ModalController,
    private cf: ChangeDetectorRef,

    
    ) { }


     @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }
  async ExcludeAlert(title: string, content: string,id_product) {
		const alert = await this.alert.create({
			header: title,
			message: content,
      buttons: [
        {
        text: 'YES',
        handler: () => {
          this.ex = true
          this.exclude(id_product)
          
        }
      },
      {
        text: 'CANCEL',
        handler: () => {
          this.ex = false
          
        }
      },
        
      ]
      
		})

		await alert.present()
	}
 
    fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
 
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((csvFile: Array<any>) => {
 
        for(let i = 0; i < csvFile.length; i++){
          const csvParsed = csvFile[i].toString();
          this.addCategories(csvParsed);           
        }
        this.presentAlert("Success!","Categories added.");
        
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.presentAlert("Fail!", "Only .csv files.")
      });
 
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategories();
    this.getProducts();
    this.ex = false;
  }

  async newProduct(){

      const modal = await this.modalController.create({
          component: NewproductPage,
        });
      return await modal.present();
  }

  async getDetails(id_product){

     const modal = await this.modalController.create({
         component: DetailproductPage,
         componentProps: {
          id_product
        }
       });
     return await modal.present();
 }

  async getCategories(){
 
      let dbCategories = this.db.firestore.collection(`categories`);
      await dbCategories.get().then((querySnapshot) => {
    
         for(let i=0;querySnapshot.docs.length;i++){
           this.name[i] = querySnapshot.docs[i].data().name;
           this.id[i] = querySnapshot.docs[i].id;
           this.areCategories = true;
           }   
    });
   
    this.areCategories = false; 
   
  }

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
      }
      
    });
    this.areProducts = false;
    
  }

  
  async addCategories(categories){
    await this.db.collection('categories').add({
      name: categories
    });
    return;
  }

  async exclude(id_product){
    if(this.ex==false){
    this.ExcludeAlert('Alert!','Are you sure about that?',id_product)
    }

    if(this.ex==true){
      await this.db.collection('products').doc(id_product).delete();
      this.presentAlert("Success!","Product deleted. Refresh the page to update.")
    }
  }


   async onInput(evt){
    
    const searchTerm = evt.srcElement.value; 
   

    for(let i=0;this.productname[i];i++){
      if(this.productname[i].includes(searchTerm) || 
      this.price[i] == searchTerm || 
      this.id_product[i]==searchTerm ||
      this.id_category[i] == searchTerm ||
      this.name[i].includes(searchTerm) ||
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
