import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'http://www.empirecclt.com.au/public/api/heroes'; // URL to web api

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http
      .get<Hero[]>(this.heroesUrl)   // 返回值<Hero[]> 改成 <any[]> 也可，
      .pipe(map(
          data => data
        ),
        catchError(this.handleError)
      );
  }

  /**
   * 改成直接获取数据
   * @param {number} id
   * @returns {Observable<Hero>}
   */
  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes =>
        heroes.find(hero => hero.id === id)
      )
    );
  }

  post(hero: Hero) {
    //hero.age = 432; //数据库定义必须输入age

    return this.http
      .post<JSON>(this.heroesUrl, hero)
      .pipe(catchError(this.handleError));
  }

  delete(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  }

  put(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .patch<JSON>(url, hero)              //因为没有输入age，所以用patch
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
