import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero } from '../hero-service/hero';
import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  error: any;
  isPut = false; // 当前页面是增加还是修改 //navigated = false; //名字不明确，

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {

        //修改hero
        this.isPut = true;
        const id = +params['id'];
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
      } else {

        //增加hero
        this.isPut = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {

    if(this.isPut) {

      this.heroService.put(this.hero).subscribe(resultJson => {
        if (resultJson['result'] === 'patch_success') {
          alert('保存成功！');  //千万不能写成死的
          this.goBack();
        }
      }, error => (this.error = error)); // TODO: Display error message

    } else {

      this.heroService.post(this.hero).subscribe(resultJson => {
        if (resultJson['result'] === 'post_success') {
          alert('保存成功！');
          this.goBack();
        } else {
          alert('保存失败！原因：'+ resultJson['reason']);
        }
      }, error => (this.error = error)); // TODO: Display error message
    }
  }

  goBack(): void {
    this.location.back();
    // 上句直接被下面替换也可
    // window.history.back();
  }
}
