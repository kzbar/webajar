import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { BlogResolver } from '../services/blog.resolver';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogResolver,CoursesService],
  encapsulation: ViewEncapsulation.None

})
export class BlogComponent implements OnInit {
  blog: any;
  bloglist: any[] = [] ;
  public image : String ;
  description : String ;
  safeHtml: SafeHtml;

  constructor(@Inject(WINDOW)
  private router: Router,
              private course: CoursesService,
              private titleService: Title,
              private meta: Meta,
              private activitedRou: ActivatedRoute,
              private sanitizer: DomSanitizer,
              @Inject(PLATFORM_ID) private platformId,

  ) { }

  ngOnInit() {
    this.blog = this.activitedRou.snapshot.data.course;
    this.image = this.blog.bolg_image;
    this.description = this.blog.blog_short_dec.slice(0, 150);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      `${this.blog.blog_content}`
    )

    this.titleService.setTitle(`${this.blog.blog_title}`);
    this.meta.updateTag({ property: 'og:title', content: this.blog.blog_title });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'ajar.website' });
    this.meta.updateTag({ property: 'og:description', content: `${ this.description}` });
    this.meta.updateTag({ property: 'og:url', content: `https://ajar.website/المدونة-العقارية/${this.blog.blog_id}` });
    this.meta.updateTag({ property: 'og:image', content: this.blog.bolg_image });
    this.meta.updateTag({ property: 'og:image:width', content: `400` });
    this.meta.updateTag({ property: 'og:image:height', content: `300` });
    this.meta.updateTag({ property: 'og:image:alt', content: this.blog.blog_title });

    this.meta.updateTag({ name: 'keywords', content: `${this.blog.blog_KeyWord}` });
    this.meta.updateTag({ name: 'image', content: `${this.blog.bolg_image}` });
    this.meta.updateTag({ name: 'description', content: `${this.description}` });
    this.meta.updateTag({ name: 'site', content: `https://ajar.website` });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ajarwebsite' });
    this.meta.updateTag({ name: 'twitter:title', content: this.blog.blog_title });
    this.meta.updateTag({ name: 'twitter:description', content: `${ this.description}` });
    this.meta.updateTag({ name: 'twitter:image', content: this.blog.bolg_image});


    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
      this.course.getLimitBlog().subscribe(item => {
        this.bloglist = item;
      });

    }

  }
  getUrl() {
    return `url(${this.image})`;
  }
  public setNewItem(item: any) {
    this.blog = item;
    this.image = this.blog.bolg_image;
    this.description = this.blog.blog_short_dec.slice(0, 150);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      `${this.blog.blog_content}`
    )
    window.scroll(0, 0);
  }

}
