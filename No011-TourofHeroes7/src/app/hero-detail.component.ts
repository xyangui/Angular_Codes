import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private route: ActivatedRoute
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
    }, error => (this.error = error)); // TODO: Display error message
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
