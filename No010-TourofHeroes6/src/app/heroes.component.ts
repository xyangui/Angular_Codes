import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private router: Router, private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService
        .getHeroes()
        .subscribe(
            heroes => (this.heroes = heroes),
        );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }


    let hero: Hero = new Hero();
    hero.name = name;

    this.heroService.post(hero).subscribe(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {

    this.heroService
      .delete(hero)
      .subscribe(res => {

      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  // addHero(): void {
  //   this.addingHero = true;
  //   this.selectedHero = null;
  // }

  // deleteHero(hero: Hero, event: any): void {
  //   event.stopPropagation();
  //   this.heroService.delete(hero).subscribe(res => {
  //     this.heroes = this.heroes.filter(h => h !== hero);
  //     if (this.selectedHero === hero) {
  //       this.selectedHero = null;
  //     }
  //   }, error => (this.error = error));
  // }
  //
  // close(savedHero: Hero): void {
  //   this.addingHero = false;
  //   if (savedHero) {
  //     this.getHeroes();
  //   }
  // }
}
