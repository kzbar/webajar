import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { BlogListResolver } from '../services/blogs.resolver.';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { CoursesService } from '../services/courses.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  providers: [CoursesService, BlogListResolver],
  encapsulation: ViewEncapsulation.None

})
export class BlogListComponent implements OnInit {
  list: any[];
// tslint:disable-next-line: max-line-length
  description = 'نقدم  لكم معلومات مهمة عن سوق العقارات  في تركيا، مواضيع عن  القطاع العقاري، مثل: الاقتصاد التركي، الاستثمار في تركيا، التملك العقاري، قوانين الإيجار، الجنسية التركية  ، الإقامة في تركيا، مواصلات إسطنبول';
  public image = 'https://ajarweb.web.app/assets/v2/img/30.jpg';

  url = 'https://ajarweb.web.app';
  text = `Jason Watmore's Blog | A Web Developer in Sydney`;
  imageUrl = 'http://jasonwatmore.com/_content/images/jason.jpg';
  listRecentForRent: any [] = [] ;
  listRecentForSale: any [] = [] ;


  constructor(@Inject(WINDOW)
  private router: Router,
    private activitedRou: ActivatedRoute,
    private cours: CoursesService,
    @Inject(PLATFORM_ID) private platformId,
    private titleService: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.list = this.activitedRou.snapshot.data.blog;
    if (!this.list) {
      this.cours.getBlogList().subscribe(item => {
        this.list = item;
      })
    }
    this.titleService.setTitle('مقالات تهمك عن العقارات في تركيا');
    this.meta.updateTag({ name: 'keywords', content: 'عقارات في تركيا,اخبار العقارات في تركيا,عقارات تركيا,مقالات عقارية' });
    this.meta.updateTag({ name: 'image', content: `${this.image}` });
    this.meta.updateTag({ name: 'description', content: `${this.description}` });
    this.meta.updateTag({ name: 'site', content: `https://ajar.website` });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: 'مقالات تهمك عن العقارات في تركيا' });
    this.meta.updateTag({ name: 'twitter:description', content: `${ this.description}` });
    this.meta.updateTag({ name: 'twitter:image', content: this.image });

    this.meta.updateTag({ property: 'og:title', content: 'مقالات تهمك عن العقارات في تركيا' });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'https://ajar.website' });
    this.meta.updateTag({ property: 'og:description', content: `${this.description}` });
    this.meta.updateTag({ property: 'og:url', content: `https://ajar.website/المدونة-العقارية` });
    this.meta.updateTag({ property: 'og:image', content: `${this.image}` });
    this.meta.updateTag({ property: 'og:image:width', content: `400` });
    this.meta.updateTag({ property: 'og:image:height', content: `300` });
    this.meta.updateTag({ property: 'og:image:alt', content: 'مقالات تهمك عن العقارات في تركيا' });

    this.cours.getLastItemAddedForRent().subscribe(item =>{
      this.listRecentForRent = item;
    });

    this.cours.getLastItemAddedForSale().subscribe(item =>{
      this.listRecentForSale = item;
    });
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }


  }

}
