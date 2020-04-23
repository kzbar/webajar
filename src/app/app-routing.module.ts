import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemsComponent } from './list-items/list-items.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { CourseResolver } from './services/course.resolver';
import { ForSaleSingleItemComponent } from './for-sale-single-item/for-sale-single-item.component';
import { SaleResolver } from './services/sale.resolver';
import { ForSaleCardComponent } from './for-sale-card/for-sale-card.component';
import { ForRentCardComponent } from './for-rent-card/for-rent-card.component';
import { SaleListResolver } from './services/salelist.resolver';
import { RentListResolver } from './services/rentlist.resolver';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListResolver } from './services/blogs.resolver.';
import { BlogResolver } from './services/blog.resolver';

const routes: Routes = [
  { path: '', component: ListItemsComponent },
  {
    path: 'شقة-للايجار-في-اسطنبول/:id', component: SingleItemComponent, resolve: {
      course: CourseResolver
    }
  },
  {
    path: 'شقة-للبيع-في-اسطنبول/:id', component: ForSaleSingleItemComponent, resolve: {
      course: SaleResolver
    }
  },
  {
    path: 'شقق-للبيع-في-تركيا', component: ForSaleCardComponent, resolve: {
      course: SaleListResolver

    }
  },
  {
    path: 'شقق-للايجار-في-اسطنبول', component: ForRentCardComponent, resolve: {
      course: RentListResolver
    }
  }
  ,
  {
    path: 'المدونة-العقارية', component: BlogListComponent, resolve: {
      blog : BlogListResolver
    }
  },
  {
    path: 'المدونة-العقارية/:id', component: BlogComponent, resolve: {
      course: BlogResolver
    }
  }
  ,
  {
    path: '**',
    redirectTo: '/'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
