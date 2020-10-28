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
 
  name: any [] =[];
  id: any [] = [];

  constructor(private db: AngularFirestore) { }


  async add(categories){
    await this.db.collection('Categories').add({
      name: categories
      
    });
    return;
  }
  
  atualizarLista(){
    this.db.collection<Categories>('Categories').get()
    .toPromise()
    .then(documentData => {


      this.categories = documentData.docs.map(doc =>{ 
        return {
          id: doc.id, ...doc.data()
        } as Categories;
      });

    }).catch(error => {
    });
  }

  async get(id: string): Promise<Categories>{
    const doc =  await this.db.collection<Categories>('Categories').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Categories;
  }

  getObservable(): Observable<Categories[]> {
    return this.db.collection<Categories>('Categories').valueChanges({ idField: 'id' });
  }

  async getCategories(){
 
    let dbCategories = this.db.firestore.collection(`categories`);

    await dbCategories.get().then((querySnapshot) => {
     
        for(let i=0; 10;i++){
          this.name[i] = querySnapshot.docs[i].data().name;
          this.id[i] = querySnapshot.docs[i].id;
          //console.log(this.name[i]);
          this.areCategories = true;
          //return this.name[i];
          }   
    //return this.id;
  });

  return this.id;
}
}

