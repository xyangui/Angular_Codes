import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';
import {RequestOptions} from "@angular/http";

@Injectable()
export class HeroService {

  //private heroesUrl = 'app444/heroes1'; // URL to web api
  // "/"前面的app444定义成什么都可以
  // "/"后面这个 heroes 对应则是 in-memory-data.service 返回的{heroes}
  // 因为这个内存Web服务的机理是拦截Web访问，也就是说随便什么地址都可以，内存Web服务会拦截这个地址并解析你的请求是否满足RESTful API的要求

  private heroesUrl = 'http://www.empirecclt.com.au/public/api/heroes'; // URL to web api

  //private heroesUrl = 'https://jsonplaceholder.typicode.com/users'; // URL to web api

  //private heroesUrl = 'https://www.easy-mock.com/mock/5a3b29c83886356782308633/q2'; // URL to web api

  //private heroesUrl = 'http://gc.ditu.aliyun.com/regeocoding?l=39.938133,116.395739&type=001';

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

    hero.age = 432;

    return this.http
      .post<Hero>(this.heroesUrl, hero)
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

    //const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put<Hero>(this.heroesUrl, hero)
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
