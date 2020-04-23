import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgxGalleryModule } from 'ngx-gallery';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { CourseResolver } from './services/course.resolver';
import { CoursesService } from './services/courses.service';
import { ItemService } from './services/item.service';
import { SingleItemComponent } from './single-item/single-item.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {
  MatDialogModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
} from '@angular/material';
import { ForSaleCardComponent } from './for-sale-card/for-sale-card.component';
import { ForRentCardComponent } from './for-rent-card/for-rent-card.component';
import { ForSaleSingleItemComponent } from './for-sale-single-item/for-sale-single-item.component';
import { SaleResolver } from './services/sale.resolver';
import { SaleListResolver } from './services/salelist.resolver';
import { RentListResolver } from './services/rentlist.resolver';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogListResolver } from './services/blogs.resolver.';
import { BlogResolver } from './services/blog.resolver';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';




@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    SingleItemComponent,
    ForSaleCardComponent,
    ForRentCardComponent,
    ForSaleSingleItemComponent,
    BlogComponent,
    BlogListComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ajar-web-site' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebase, 'website'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxGalleryModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    JwSocialButtonsModule,
    MDBBootstrapModule.forRoot(),
    NoopAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish
      , backdropBackgroundColour: 'rgba(0,0,0,0.1)'
      , backdropBorderRadius: '4px', primaryColour: '#ff33fff'
      , secondaryColour: '#00000', tertiaryColour: '#ffffff'

    }),
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule


  ],
  providers: [ItemService,
    CoursesService,
    CourseResolver,
    SaleResolver,
    SaleListResolver,
    RentListResolver,
    BlogListResolver,
    BlogResolver],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor() {
  }
}

