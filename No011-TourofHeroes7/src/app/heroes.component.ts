import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;  //当前逻辑是，add和selectedHero页面，只显示一个，二者没有必然联系，没有必要只显示一个
  addingHero = false;  //只有点击"Add New Hero"时，= true
  error: any;
  //showNgFor = false;

  constructor(private router: Router, private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(
        heroes => (this.heroes = heroes),
        error => (this.error = error)
      )
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  /**
   * 点击按钮"Add New Hero"，出现"my-hero-detail"，
   * 点击按钮"Back"执行顺序是：
   * this.close.emit(savedHero);  （hero-detail.component.ts中的goBack(savedHero: Hero = null)）
   * close(savedHero: Hero);      （下面的）
   * if (this.navigated) {...}    （hero-detail.component.ts中的goBack(savedHero: Hero = null)）
   *
   * @param {Hero} savedHero
   */
  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {      //新增了hero，重新获取所有数据，逻辑比较复杂
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
