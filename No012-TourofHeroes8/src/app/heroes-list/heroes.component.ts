import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero-service/hero';
import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  error: any;

  constructor(private router: Router, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(
        heroes =>
          (this.heroes = heroes),
        error =>
          (this.error = error)
      )
  }

  addHero(): void {
    this.router.navigate(['/detail']);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
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
}
