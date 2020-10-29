import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Categories []=[];
  areCategories: boolean;
  categoryname:any;
  category:any;
  name: any [] =[];
  id: any [] = [];

  constructor(private db: AngularFirestore) { }

  //add categories to database
  async addCategories(categories){
    await this.db.collection('categories').add({
      name: categories
    });
    return;
  }

  //get categories infomation
  async getCategories(){
     let dbCategories = this.db.firestore.collection(`categories`);
    await dbCategories.get().then((querySnapshot) => {
  
       for(let i=0;querySnapshot.docs.length;i++){
         this.name[i] = querySnapshot.docs[i].data().name;
         this.id[i] = querySnapshot.docs[i].id;
         this.areCategories = true;
         }
        return this.name, this.id, this.areCategories    
  });
  this.areCategories = false; 
}




}

