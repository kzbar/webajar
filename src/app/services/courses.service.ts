

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from '../models/Item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable()
export class CoursesService {
    collectionForRent: AngularFirestoreCollection<Item>;
    collectionForSale: AngularFirestoreCollection<Item>;
    collectionBlog: AngularFirestoreCollection<any>;
    collectionBlogLimit: AngularFirestoreCollection<any>;
    collectionForRentLimit: AngularFirestoreCollection<Item>;
    collectionForSaleLimit: AngularFirestoreCollection<Item>;

    Code: any;
    citiesRef: any;
    queryRef: any;

    constructor(private http: HttpClient, private afs: AngularFirestore) {

    }

    findById(path): Observable<Item> {
        return this.afs.doc<Item>(path).valueChanges();
    }
    findByIdBlog(path): Observable<any> {
        return this.afs.doc<any>(path).valueChanges();
    }
    getForSale(path): Observable<Item[]> {
        this.collectionForSale = this.afs.collection('SALE_COLLECTION', ref => {
            return ref.where('ad_CountryCode', '==', 'TR');
        });
        return this.collectionForSale.valueChanges();
    }

    getAllAds(): Observable<Item[]> {
        this.collectionForRent = this.afs.collection('RENT_COLLECTION', ref => {
            return ref.where('ad_CountryCode', '==', 'TR');
        });

        return this.collectionForRent.valueChanges();
    }
    getAllAdsForSale(): Observable<any[]> {
        this.collectionForSale = this.afs.collection('SALE_COLLECTION', ref => {
            return ref.where('ad_CountryCode', '==', 'TR');
        });
        return this.collectionForSale.valueChanges();
    }
    // tslint:disable-next-line: max-line-length
    getAdByad_Floor( floor: any, room: any, fun:any, type: any) {
        const citiesRef = this.afs.collection('RENT_COLLECTION').ref;
        let queryRef = citiesRef.where('ad_CountryCode', '==', 'TR');
        if (floor != null) {
            queryRef = queryRef.where('ad_Floor', '==', `${floor}`);
        }
        if (room != null) {
            queryRef = queryRef.where('ad_Room', '==', `${room}`);

        }
        if (fun != null) {
            queryRef = queryRef.where('ad_Furniture', '==', `${fun}`);

        }
        if (type != null) {
            queryRef = queryRef.where('ad_Type', '==', `${type}`);

        }
        return this.afs.collection('RENT_COLLECTION', () => {
            return queryRef;
        });


    }
    getAdForSaleBy(floor: any, room: any, fun:any, type: any ,state:any){
        const citiesRef = this.afs.collection('SALE_COLLECTION').ref;
        let queryRef = citiesRef.where('ad_CountryCode', '==', 'TR');
        if (floor != null) {
            queryRef = queryRef.where('ad_Floor', '==', `${floor}`);
        }
        if (room != null) {
            queryRef = queryRef.where('ad_Room', '==', `${room}`);

        }
        if (fun != null) {
            queryRef = queryRef.where('ad_Furniture', '==', `${fun}`);

        }
        if (type != null) {
            queryRef = queryRef.where('ad_Type', '==', `${type}`);

        }
        if (state != null){
            queryRef = queryRef.where('ad_Property_Status', '==', `${state}`);

        }
        return this.afs.collection('RENT_COLLECTION', () => {
            return queryRef;
        });

    }
    getLastItemAddedForRent(): Observable<Item[]>{
        this.collectionForRentLimit = this.afs.collection('RENT_COLLECTION', ref => {
            return ref.where('ad_CountryCode', '==', 'TR').orderBy('ad_Date', 'desc').limit(6);
        });
        return this.collectionForRentLimit.valueChanges();

    }
    getLastItemAddedForSale(): Observable<Item[]>{
        this.collectionForSaleLimit = this.afs.collection('SALE_COLLECTION', ref => {
            return ref.where('ad_CountryCode', '==', 'TR').orderBy('ad_Date', 'desc').limit(6);
        });
        return this.collectionForSaleLimit.valueChanges();

    }

    getLimitBlog() : Observable<any[]> {
        this.collectionBlogLimit = this.afs.collection('BLOG_COLLECTION', ref => {
            return ref.orderBy('bolg_date','desc').limit(10);
        });
        return this.collectionBlogLimit.valueChanges();
    }

    getBlogList() : Observable<Item[]>{
        this.collectionBlog = this.afs.collection('BLOG_COLLECTION');
        return this.collectionBlog.valueChanges();

    }
    getBlogSingle(id){

    }



}