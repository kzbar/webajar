import { Component, OnInit, Inject, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOptions } from 'ngx-gallery';
import { WINDOW } from '@ng-toolkit/universal';
import { CoursesService } from '../services/courses.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-for-sale-single-item',
  templateUrl: './for-sale-single-item.component.html',
  styleUrls: ['./for-sale-single-item.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ForSaleSingleItemComponent implements OnInit {
  singleItem: any;

// tslint:disable-next-line: variable-name
  _album: any[] = [];
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[];
// tslint:disable-next-line: ban-types
  public phone: String ;
  listRecent: any [] = [];

  constructor(@Inject(WINDOW) private window: Window,
              private router: Router,
              private activitedRou: ActivatedRoute,
              private titleService: Title,
              private meta: Meta,
              private service: CoursesService,
              @Inject(PLATFORM_ID) private platformId,

  ) {}
  ngOnInit() {
    this.singleItem = this.activitedRou.snapshot.data.course;
    this.geturls();
    this.phone = String(this.singleItem.ad_Phone);
    this.phone = this.phone.replace(/ /g, '');
    this.service.getLastItemAddedForSale().subscribe(item => {
      this.listRecent = item;
    });
    this.titleService.setTitle(`${this.singleItem.ad_Title}`);
    this.meta.updateTag({ name: 'keywords', content: `${this.singleItem.ad_KeyWord}`});
    this.meta.updateTag({ name: 'image', content: this.singleItem.ad_DefaultImage });
    this.meta.updateTag({ name: 'site', content: 'ajar.website' });
    this.meta.updateTag({ name: 'description', content: this.singleItem.ad_Description });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content:  this.singleItem.ad_Title });
    this.meta.updateTag({ name: 'twitter:description', content: `${this.singleItem.ad_Description}`});
    this.meta.updateTag({ name: 'twitter:image', content: this.singleItem.ad_DefaultImage });

    this.meta.updateTag({ property: 'og:title', content: this.singleItem.ad_Title });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'ajar.website' });
    this.meta.updateTag({ property: 'og:description', content: `${this.singleItem.ad_Description}` });

    this.meta.updateTag({ property: 'og:url', content: `https://ajar.website/شقة-للبيع-في-اسطنبول/${this.singleItem.ad_No}` });
    this.meta.updateTag({ property: 'og:image', content: this.singleItem.ad_DefaultImage });
    this.meta.updateTag({ property: 'og:image:width', content: `400` });
    this.meta.updateTag({ property: 'og:image:height', content: `300` });
    this.meta.updateTag({ property: 'og:image:alt', content: this.singleItem.ad_Title });
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }

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
  public setNewItem(item: any) {
    this.singleItem = item ;
    this.phone = String(this.singleItem.ad_Phone);
    this.phone = this.phone.replace(/ /g, '');
    this.galleryImages = [] ;
    this.geturls();
    window.scroll(0, 0);
  }

}



