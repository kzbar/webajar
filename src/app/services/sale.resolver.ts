import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {CoursesService} from './courses.service';
import {first, tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import { Item } from '../models/Item';


@Injectable()
export class SaleResolver implements Resolve<Item> {

    constructor(
        private coursesService: CoursesService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState:TransferState
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
        const courseId = route.params.id;
        const COURSE_KEY = makeStateKey<any>('شقق-للبيع-في-اسطنبول-' + courseId);
        if (this.transferState.hasKey(COURSE_KEY)) {
            return this.coursesService.findById(`SALE_COLLECTION/${courseId}`).pipe(first(), tap(course => {
                return course;
            }));
        } else {
            return this.coursesService.findById(`SALE_COLLECTION/${courseId}`).pipe(first() , tap (course => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(COURSE_KEY, course);
                    }
                }));
        }


    }


}