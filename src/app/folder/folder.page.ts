
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AngularFirestore } from  '@angular/fire/firestore';
import {CategoriesService} from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController, Platform, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Categories } from 'src/app/models';
import { NewproductPage } from 'src/app/pages/newproduct/newproduct.page';
import { DetailproductPage } from '../pages/detailproduct/detailproduct.page';


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
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    private alert: AlertController,
    private modalController: ModalController
    ) { }

    ngOnInit() {
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
      this.categoriesService.getCategories();
      this.productsService.getProducts();
      this.ex = false;
    }

    @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
    fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((csvFile: Array<any>) => {
 
        for(let i = 0; i < csvFile.length; i++){
          const csvParsed = csvFile[i].toString();
          this.categoriesService.addCategories(csvParsed);           
        }
        this.presentAlert("Success!","Categories added. Please, refesh the page to update");
        
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.presentAlert("Fail!", "Only .csv files.")
      });
 
  }

  async newProductPopUp(){
      const modal = await this.modalController.create({
          component: NewproductPage,
        });
      return await modal.present();
  }

  async getDetailsPopUp(id_product){
    const modal = await this.modalController.create({
         component: DetailproductPage,
         componentProps: {
          id_product
         }
    });
     return await modal.present();
  }

  async excludeProduct(id_product){
    if(this.ex==false){
    this.ExcludeAlert('Alert!','Are you sure about that?',id_product)
    }
    if(this.ex==true){
      await this.db.collection('products').doc(id_product).delete();
      this.presentAlert("Success!","Product deleted. Please, refesh the page to update.")
    }
  }
  
  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
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
          this.excludeProduct(id_product)  
          }
        },
        {
        text: 'CANCEL',
        handler: () => {
          this.ex = false
          
          }
        },
      ]     
		});
		await alert.present()
	}
    
}
