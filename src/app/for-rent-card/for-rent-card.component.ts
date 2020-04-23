import { Component, OnInit, Inject, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { images } from '../models/images';
import { Item } from '../models/Item';
import { CoursesService } from '../services/courses.service';
import { WINDOW } from '@ng-toolkit/universal';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { RentListResolver } from '../services/rentlist.resolver';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-for-rent-card',
  templateUrl: './for-rent-card.component.html',
  styleUrls: ['./for-rent-card.component.css'],
  providers: [CoursesService, RentListResolver],
  encapsulation: ViewEncapsulation.None


})
export class ForRentCardComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  public dec = 'شقق  للايجار في اسطنبول ,شقق للايجار الشهري و السنوي في اسطنبول  شقق فندقية في اسطنبول بأسعار رخصية ومناسبة ,شقق فندقية وسياحية في اسطنول';
  public image = 'https://ajar.website/assets/v1/images/og_imag_For_Rent_jpg.jpg';
  public title = 'شقق للايجار في اسطنبول - موقع آجار';
// tslint:disable-next-line: max-line-length
  public keywords = 'شقق للايجار في اسطنبول,العقارات في اسطنبول,شقق رخصية في اسطنبول,أسعار الايجارات في اسطنبول, شقق فندقية في اسطنبول, شقق سياحية في اسطنبول 2019 ,أسعار الشقق في اسطنبول 2019';

  room: any;
  floor: any;
  fun: any;
  type: any;
  listRent: Item[];
  images: Observable<images[]>;
  imgArray: images[];
  public loading = false;
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
  public message = 'جاري جلب البيانات';

  constructor(@Inject(WINDOW)
  private router: Router,
              private cours: CoursesService,
              private meta: Meta,
              private titleService: Title,
              private activitedRou: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId,

  ) { }


  ngOnInit() {
    this.loading = true;
    this.listRent = this.activitedRou.snapshot.data.course;

    if (!this.listRent) {

      this.cours.getAllAds().subscribe(item => {
        this.listRent = item;
        // tslint:disable-next-line: triple-equals
        if (this.listRent.length == 0) {
          this.message = 'لا يوجد عروض القائمة فارغة ';
        }
      });
      this.loading = false;

    } else {
      this.loading = false;
      this.message = 'لا يوجد عروض القائمة فارغة ';
    }

    this.titleService.setTitle(this.title);
    this.meta.updateTag({ name: 'image', content : this.image });
    this.meta.updateTag({ name: 'site', content: 'ajar.website' });
    this.meta.updateTag({ name: 'description', content: this.dec });
    this.meta.updateTag({ name: 'keywords', content: this.keywords });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: this.title});
    this.meta.updateTag({ name: 'twitter:description', content: this.dec });
    this.meta.updateTag({ name: 'twitter:image', content: this.image });


    this.meta.updateTag({ property: 'og:title', content: this.title });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'موقع اجار ' });
    this.meta.updateTag({ property: 'og:description', content:this.dec });
    this.meta.updateTag({ property: 'og:image', content: this.image });
    this.meta.updateTag({ property: 'og:url', content: 'https://ajar.website/شقق-للايجار-في-اسطنبول' });
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);

    }

  }
  selectionChange() {
    this.loading = true;
    this.cours.getAdByad_Floor(this.floor, this.room, this.fun, this.type).valueChanges().subscribe(item => {
      this.listRent = item;
      if (this.listRent.length === 0) {
        this.message = 'لا يوجد عروض القائمة فارغة ';
      }
      this.loading = false;
    });


  }
  clearSearch() {
    this.loading = true;
    this.cours.getAllAds().subscribe(item => {
      this.listRent = item;
      this.loading = false;
    });

  }
}
