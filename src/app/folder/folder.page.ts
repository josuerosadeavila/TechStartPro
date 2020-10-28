
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AngularFirestore } from  '@angular/fire/firestore';
import {CategoriesService} from"src/app/services/categories.service";

import { AlertController } from '@ionic/angular';
import { Categories } from 'src/app/models';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  header = false;
  areCategories: boolean;
  categories: Categories []=[];
  name: any [] =[];
  id: any [] = [];

  

  constructor(private activatedRoute: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser,
    private db: AngularFirestore,
    private categoriesService: CategoriesService,
    private alert: AlertController
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
  }

  async getCategories(){
 
      let dbCategories = this.db.firestore.collection(`categories`);
  
      await dbCategories.get().then((querySnapshot) => {
       
          for(let i=0;querySnapshot.docs.length;i++){
            this.name[i] = querySnapshot.docs[i].data().name;
            this.id[i] = querySnapshot.docs[i].id;
            console.log(this.name[i]);
            this.areCategories = true;
            }   
    });
    
    this.areCategories = false;
    console.log(this.areCategories);
    
  }

  
  async addCategories(categories){
    await this.db.collection('categories').add({
      name: categories
    });
    return;
  }
}
