import { Injectable, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Item} from '../models/Item'

import { images } from '../models/images';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({ 
  providedIn: 'root'
})
export class ItemService  {
  item:Observable<Item[]>
  images:Observable<images[]>
  collection:AngularFirestoreCollection<Item>
  a:AngularFirestore
  singleItem: any;
  items_:Item[];
  constructor(public afs: AngularFirestore,private http: HttpClient) {
    this.collection = this.afs.collection('RENT_COLLECTION',ref =>{
      return ref.where('ad_CountryCode','==',`${this.getCountry()}`)
    })
    this.item  = this.collection.valueChanges();
   }
   getItem(){
    return this.item
  }
  getSingleItem(id:String){
        return this.afs.doc('RENT_COLLECTION/'+id).ref.get()
  }
  getCountry() {
    this.http.get<any>('http://ip-api.com/json'); 
  }


}




