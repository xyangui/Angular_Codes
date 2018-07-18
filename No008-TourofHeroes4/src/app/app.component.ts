import { Component, OnInit } from '@angular/core';

import { Hero } from "./hero";
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero" 
        (click)="onSelect(hero)"><!-- hero === selectedHero ，为true时，添加一个CSS类selected，为false时则会移除selected类 -->
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <hero-detail [hero]="selectedHero"></hero-detail>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [HeroService]  //providers数组告诉 Angular，当它创建新的AppComponent组件时，也要创建一个HeroService的新实例
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  // 构造函数参数类型、@Component装饰器和父级的providers信息合起来告诉 Angular 的注入器，
  // 任何新建HeroListComponent的时候，注入一个HeroService的实例。
  // http://origin.angular.live/docs/ts/latest/guide/dependency-injection.html#!#providers
  // 在一个注入器的范围内，依赖都是单例的。 在这个例子中，HeroesComponent和它的子组件HeroListComponent共享同一个HeroService实例。
  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();

    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  //只要我们实现了 Angular 的 ngOnInit 生命周期钩子，Angular 就会主动调用这个钩子
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
