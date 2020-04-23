import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
// tslint:disable-next-line: max-line-length
  public dec = 'شقق  للبيع في تركيا ,شقق للبيع بالتقسيط في تركيا شقق للبيع في اسطنبول أسعار العقارات في اسطنبول ,الحصول على الجنسية التركية من خلال  شراء عقار في تركيا شقق للبيع تركيا 2019 الشراء من المالك مباشرة , الطابو التركية';
  public image = 'https://ajarweb.web.app/assets/v1/images/og_imag_jpg.jpg';
  public title = 'شقق للبيع في تركيا - موقع آجار ';
// tslint:disable-next-line: max-line-length
  public keywords = 'شقق للبع في تركيا,العقارات في تركيا,الطابو التركي,أسعار العقارات في اسطنبول, شراء عقار في اسطنبول, أسعار الشقق في تركيا 2019 ,أسعار الشقق في اسطنبول 2019';

  constructor(
    private meta: Meta,
    private titleService: Title,
    public platform: Platform
  ) { }
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.updateTag({ name: 'image', content: this.image });
    this.meta.updateTag({ name: 'site', content: 'ajar.website' });
    this.meta.updateTag({ name: 'description', content: this.dec });
    this.meta.updateTag({ name: 'keywords', content: this.keywords});


    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: this.title });
    this.meta.updateTag({ name: 'twitter:description', content: this.dec });
    this.meta.updateTag({ name: 'twitter:image', content: this.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:title', content: this.title });
    this.meta.updateTag({ property: 'og:site_name', content: 'موقع اجار ' });
    this.meta.updateTag({ property: 'og:description', content: this.dec});
    this.meta.updateTag({ property: 'og:image', content: this.image });
    this.meta.updateTag({ property: 'og:url', content: 'https://ajar.website/شقق-للبيع-في-تركيا' });
    this.meta.updateTag({ property: 'og:image:alt', content: this.title });

  }
  public showAlert(): void {
    alert('لاضافة اعلانك على الموقع يرجى تحميل تطبيق آجار من متجر غوغل بلاي');
    window.open('https://play.google.com/store/apps/details?id=com.ajar.website');

  }

}
