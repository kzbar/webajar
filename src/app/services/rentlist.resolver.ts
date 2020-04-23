import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {CoursesService} from './courses.service';
import {first, tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import { Item } from '../models/Item';


@Injectable()
export class RentListResolver implements Resolve<Item[]> {

    constructor(
        private coursesService: CoursesService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState:TransferState
    ) {

    }

    resolve(): Observable<Item[]> {

        const COURSE_KEY = makeStateKey<any>('شقق-للايجار-في-اسطنبول');
        if (this.transferState.hasKey(COURSE_KEY)) {
           return this.coursesService.getAllAds().pipe(first(),tap (course =>{
               return course;
           }));
        } else {
          return this.coursesService.getAllAds().pipe(first() , tap (course => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(COURSE_KEY, course);
                }
                return course;
            }));

        }


    }


}