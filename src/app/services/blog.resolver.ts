import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {CoursesService} from './courses.service';
import {first, tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import { Item } from '../models/Item';


@Injectable()
export class BlogResolver implements Resolve<any> {

    constructor(
        private coursesService: CoursesService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState:TransferState
    ) {

    }

    resolve(route: ActivatedRouteSnapshot): any {
        const courseId = route.params.id;

        const COURSE_KEY = makeStateKey<any>('المدونة-العقارية-' + courseId);
        if (this.transferState.hasKey(COURSE_KEY)) {
            return this.coursesService.findByIdBlog(`BLOG_COLLECTION/${courseId}`).pipe(first(), tap(course => {
                return course;
            }));
        } else {
            return this.coursesService.findByIdBlog(`BLOG_COLLECTION/${courseId}`).pipe(first() , tap (course => {
                    if (isPlatformServer(this.platformId)) {
                        console.log(course);
                        console.log(courseId);
                        this.transferState.set(COURSE_KEY, course);
                    }
                }));
        }


    }


}