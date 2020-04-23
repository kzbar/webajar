import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Item } from '../models/Item';
import { images } from '../models/images';
import { Observable } from 'rxjs/internal/Observable';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CoursesService } from '../services/courses.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs/typings/public-api';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
  providers: [ItemService, CoursesService],
  encapsulation: ViewEncapsulation.None


})

export class ListItemsComponent implements OnInit {

  tabs: any[] = [
    { title: 'Dynamic Tab 1', content: 'Dynamic tab content 1' },
    { title: 'Dynamic Tab 2', content: 'Dynamic tab content 2' },
    ];
  room: any;
  floor: any;
  fun: any;
  type: any;
  items: Item[];
  itemsForSale: any[];
  images: Observable<images[]>;
  imgArray: images[];
  rooms: any[] = [
    { value: null, viewValue: 'None' },
    { value: '1+0', viewValue: '1+0' },
    { value: '1+1', viewValue: '1+1' },
    { value: '2+1', viewValue: '2+1' },
    { value: '2+2', viewValue: '2+2' },
    { value: '3+1', viewValue: '3+1' },
    { value: '3+2', viewValue: '3+2' },
    { value: '4+1', viewValue: '4+1' },
    { value: '4+2', viewValue: '4+2' },
    { value: '4+3', viewValue: '4+3' },
    { value: '5+1', viewValue: '5+1' },
    { value: '5+3', viewValue: '5+3' },
    { value: '6+1', viewValue: '6+1' },
    { value: 'غير ذلك', viewValue: 'غير ذلك' },
  ];
  floors = [
    { value: null, viewValue: 'None' },
    { value: '-2', viewValue: '-2' },
    { value: '-1', viewValue: '-1' },
    { value: '0', viewValue: '0' },
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
    { value: '8', viewValue: '8' },
    { value: '9', viewValue: '9' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '24', viewValue: '24' },
    { value: '25', viewValue: '25' },
  ];
  // tslint:disable-next-line: max-line-length
  dec = 'شقق  للبيع في تركيا ,شقق للبيع بالتقسيط في تركيا شقق للبيع في اسطنبول أسعار العقارات في اسطنبول ,الحصول على الجنسية التركية من خلال  شراء عقار في تركيا شقق للبيع تركيا 2019 الشراء من المالك مباشرة , الطابو التركية';
  image = 'https://ajar.website/assets/v1/images/og_imag_jpg.jpg';
  title = 'شقق للبيع في تركيا - موقع آجار ';
  // tslint:disable-next-line: max-line-length
  keywords = 'شقق للبع في تركيا,العقارات في تركيا,الطابو التركي,أسعار العقارات في اسطنبول, شراء عقار في اسطنبول, أسعار الشقق في تركيا 2019 ,أسعار الشقق في اسطنبول 2019';

  public loading = false;
  options: FormGroup;
  public message = 'جاري جلب البيانات';
  constructor(
              private router: Router,
              private cours: CoursesService,
              private meta: Meta,
              private titleService: Title,
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.updateTag({ name: 'image', content: this.image });
    this.meta.updateTag({ name: 'site', content: 'ajar.website' });
    this.meta.updateTag({ name: 'description', content: this.dec });
    this.meta.updateTag({ name: 'keywords', content: this.keywords });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: this.title });
    this.meta.updateTag({ name: 'twitter:description', content: this.dec });
    this.meta.updateTag({ name: 'twitter:image', content: this.image });

    this.meta.updateTag({ property: 'og:title', content: this.title });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'موقع آجار ' });
    this.meta.updateTag({ property: 'og:description', content: this.dec });
    this.meta.updateTag({ property: 'og:image', content: this.image });
    this.meta.updateTag({ property: 'og:url', content: 'https://ajar.website' });
  }
  public showAlert(): void {
    alert('لاضافة اعلانك على الموقع يرجى تحميل تطبيق آجار من متجر غوغل بلاي');
  }
  selectionChange() {
    this.loading = true;
    this.cours.getAdByad_Floor(this.floor, this.room, this.fun, this.type).valueChanges().subscribe(item => {
      this.items = item;
      if (this.items.length == 0) {
        this.message = 'لا يوجد عروض القائمة فارغة ';
      }
      this.loading = false;
    });


  }
  clearSearch() {
    this.loading = true;
    this.cours.getAllAds().subscribe(item => {
      this.items = item;
      this.loading = false;
    });

  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // console.log('index => ', tabChangeEvent.index);
  }
}
