import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroService }  from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
// 原来是这样
// @Input() hero: Hero;  // HeroDetailComponent 内部
// <hero-detail [hero]="selectedHero"></hero-detail> //使用 HeroDetailComponent
// 我们无法将一个完整的 hero 对象嵌入到 URL 中

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    //   .subscribe(hero => this.hero = hero);

    this.route.params.pipe(
      switchMap((params: Params) => this.heroService.getHero(+params['id'])))
      .subscribe(hero => this.hero = hero);

    // 注意switchMap运算符如何将可观察的路由参数中的 id 映射到一个新的Observable， 即HeroService.getHero()方法的结果。
    // 如果用户在 getHero 请求执行的过程中再次导航这个组件，switchMap 再次调用HeroService.getHero()之前， 会取消之前的请求。
    // 英雄的id是数字，而路由参数的值总是字符串。 所以我们需要通过 JavaScript 的 (+) 操作符把路由参数的值转成数字。
  }

  goBack(): void {
    this.location.back();
  }
}

