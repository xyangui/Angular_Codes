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
  //addingHero = false;
  //error: any;
  //showNgFor = false;

  constructor(private router: Router, private heroService: HeroService) {
  }

  getHeroes(): void {
    this.heroService
        .getHeroes()
        .subscribe(
            heroes => (this.heroes = heroes),
            //error => (this.error = error)
        )
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }


    let hero: Hero = new Hero();
    hero.name = name;
    //hero.id 没有赋值， = undefined
    //if (hero.id) = fasle

    this.heroService.save(hero).subscribe(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });

    // this.heroService.create(name)
    //     .then(hero => {
    //       this.heroes.push(hero);
    //       this.selectedHero = null;
    //     });
  }

  delete(hero: Hero): void {


    this.heroService.delete(hero).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });


    // this.heroService
    //     .delete(hero.id)
    //     .then(() => {
    //       this.heroes = this.heroes.filter(h => h !== hero);
    //       if (this.selectedHero === hero) {
    //         this.selectedHero = null;
    //       }
    //     });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    //this.addingHero = false;
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
