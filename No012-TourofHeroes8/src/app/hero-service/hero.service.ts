import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';
import {RequestOptions} from "@angular/http";

@Injectable()
export class HeroService {

  private heroesUrl = 'http://www.empirecclt.com.au/public/api/heroes'; // URL to web api

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http
      .get<Hero[]>(this.heroesUrl)   // <Hero[]> 改成 <any[]> 也可
      .pipe(
        map(
          data => data
        ),
        catchError(this.handleError)
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes =>
        heroes.find(hero => hero.id === id)
      )
    );
  }

  // Add new Hero
  private post(hero: Hero) {
    // const headers = new Headers({
    //   'Content-Type': 'application/json'
    // });

    hero.age = 432; //数据库定义必须输入age

    return this.http
      .post<JSON>(this.heroesUrl, hero)
      .pipe(catchError(this.handleError));
  }

  delete(hero: Hero) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  }

  // Update existing Hero
  private put(hero: Hero) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .patch<JSON>(url, hero)              //因为没有输入age，所以用patch
      .pipe(catchError(this.handleError));
  }

  /**
   *  let hero: Hero = new Hero();
   *  hero.name = name;
   *
   *  hero.id 没有赋值， = undefined
   *  if (hero.id) = false
   */
  save(hero: Hero) {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
