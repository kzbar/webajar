import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Inject, APP_ID, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxGalleryModule } from 'ngx-gallery';
import { ItemService } from './services/item.service';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AppModule } from './app.module';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ajar-web-site' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebase, 'website'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxGalleryModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ff33fff', 
      secondaryColour: '#00000', 
      tertiaryColour: '#ffffff'

    }),
    AppModule


  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
  constructor(  @Inject(PLATFORM_ID) private platformId: Object,@Inject(APP_ID) private appId: string ,private afs: AngularFirestore) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }

  }
 
