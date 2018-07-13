import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  //@Input() hero: Hero;
  //@Output() close = new EventEmitter();
  //error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    // 通过参数id，取出响应数据
    // this.route.params.pipe(
    //     switchMap((params: Params) => this.heroService.getHero(+params['id'])))
    //     .subscribe(hero => this.hero = hero);

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    this.heroService.save(this.hero).subscribe(hero => {
      this.hero = hero; // saved hero, w/ id if new
      this.goBack(hero);
    });
  }

  goBack(savedHero: Hero = null): void {
    this.location.back();
  }
}
