import { Component, OnInit, INJECTOR, Inject, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { tap, startWith, single } from 'rxjs/operators';

import { Item } from '../models/Item';
import { Observable } from 'rxjs/internal/Observable';
import { images } from '../models/images';
import { ItemService } from '../services/item.service';
import { WINDOW } from '@ng-toolkit/universal';
import { CoursesService } from '../services/courses.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css'],
  providers: [ItemService, CoursesService],
  encapsulation: ViewEncapsulation.None

})
export class SingleItemComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  animal$: Observable<any>;
  public loading = false;
  // tslint:disable-next-line: ban-types
  public phone: String;
  public Newphone: String;
  // tslint:disable-next-line: max-line-length
  public keywords = 'شقق للايجار في اسطنبول,العقارات في اسطنبول,شقق رخصية في اسطنبول,أسعار الايجارات في اسطنبول, شقق فندقية في اسطنبول, شقق سياحية في اسطنبول 2019 ,أسعار الشقق في اسطنبول 2019';

  // tslint:disable-next-line: variable-name
  public message_loading = 'جاري جلب البيانات';
  public id;
  // tslint:disable-next-line: variable-name
  items_: Item[];
  listRecent: any[] = []
  singleItem: any;
  articlesCollection: AngularFirestoreCollection<Item>;
  articles: Observable<Item[]>;
  images: Observable<images[]>;
  // tslint:disable-next-line: variable-name
  _album: any[] = [];
  constructor(@Inject(WINDOW) private window: Window,
              private router: Router,
              private activitedRou: ActivatedRoute,
              private titleService: Title,
              private meta: Meta,
              private service: CoursesService,
              @Inject(PLATFORM_ID) private platformId,

  ) {


  }

  ngOnInit() {
    this.singleItem = this.activitedRou.snapshot.data.course;
    this.geturls();
    this.phone = String(this.singleItem.ad_Phone);
    this.phone = this.phone.replace(/ /g, '');
    this.service.getLastItemAddedForRent().subscribe(item => {
      this.listRecent = item;
    });

    this.titleService.setTitle(`${this.singleItem.ad_Title}`);
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: this.singleItem.ad_Title });
    // tslint:disable-next-line: max-line-length
    this.meta.updateTag({ name: 'twitter:description', content: `شقة للايجار ${this.singleItem.ad_Type} في منطقة ${this.singleItem.ad_Address} عدد الغرف ${this.singleItem.ad_Room}` });
    this.meta.updateTag({ name: 'twitter:image', content: this.singleItem.ad_DefaultImage });
    // tslint:disable-next-line: max-line-length
    this.meta.updateTag({ name: 'keywords', content: this.keywords });

    // tslint:disable-next-line: max-line-length
    this.meta.updateTag({ property: 'og:title', content: this.singleItem.ad_Title });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'ajar.website' });
// tslint:disable-next-line: max-line-length
    this.meta.updateTag({ property: 'og:description', content: `شقة للايجار ${this.singleItem.ad_Type} في منطقة ${this.singleItem.ad_Address} عدد الغرف ${this.singleItem.ad_Room}` });
    this.meta.updateTag({ property: 'og:url', content: `https://ajar.website/شقة-للايجار-في-اسطنبول/${this.singleItem.ad_No}` });
    this.meta.updateTag({ property: 'og:image', content: this.singleItem.ad_DefaultImage });
    this.meta.updateTag({ property: 'og:image:width', content: `400` });
    this.meta.updateTag({ property: 'og:image:height', content: `300` });
    this.meta.updateTag({ property: 'og:image:alt', content: this.singleItem.ad_Title });
    if (!this.singleItem) {
      this.message_loading = 'الاعلان غير متوفر';
    }
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);

    }



    const id = this.activitedRou.snapshot.paramMap.get('id');
    this.id = id;
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        imageSize: 'contain',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Zoom,
        preview: true,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imageSize: 'contain',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true,
        thumbnailsColumns: 3,

      }
    ];
  }
  geturls() {
    for (const entry of this.singleItem.ad_ListImages) {
      const small = entry.imageUri;
      const medium = entry.imageUri;
      const big = entry.imageUri;
      const album = {
        small,
        medium,
        big
      };

      this.galleryImages.push(album);
    }


  }

  public toggleColours() {
    this.router.navigate(['/']);

  }
  public setNewItem(item: any) {
    this.singleItem = item;
    this.phone = String(this.singleItem.ad_Phone);
    this.phone = this.phone.replace(/ /g, '');
    this.galleryImages = []
    this.geturls();
    window.scroll(0, 0);
  }
}
