import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  /**
   *  可以从两种方式显示该组件：
   *  1、在 dashboard.component.html 中的：
   *  <a *ngFor="let hero of heroes"  [routerLink]="['/detail', hero.id]"  class="col-1-4">
   *  和 在 heroes.component.ts 中的：
   *  this.router.navigate(['/detail', this.selectedHero.id]);       路由到detail
   *  2、也可以在 heroes.component.html 中的：
   * <my-hero-detail (close)="close($event)"></my-hero-detail>       直接显示该组件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {

        //是导航到此页面
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
      } else {

        //是引用标签<my-hero-detail>到此页面，即增加hero
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    this.heroService.save(this.hero).subscribe(hero => {
      this.hero = hero; // saved hero, w/ id if new
      this.goBack(hero);
    }, error => (this.error = error)); // TODO: Display error message
  }

  /**
   * @param {Hero} savedHero，只有在add new hero时save()后，不为null
   * 修改已经存在的hero，save()后，=null，点击Back按钮时，=null
   */
  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);  //带参数发送事件

    /**
     * 如果是在heroes.component.ts组件里"Add New Hero"，执行顺序是：
     * this.close.emit(savedHero);  （hero-detail.component.ts）
     * close(savedHero: Hero);      （heroes.component.ts）
     * if (this.navigated) {...}    （hero-detail.component.ts）
     *
     * 如果是显示某hero的detail，执行顺序是：
     * this.close.emit(savedHero);  （hero-detail.component.ts）
     * if (this.navigated) {...}    （hero-detail.component.ts）
     */

    if (this.navigated) {  //是导航到此页面时，要返回，

      this.location.back();
      //上句直接被下面替换也可
      //window.history.back();
    }
  }
}
