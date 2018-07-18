import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()  // 标识一个类可以被注入器实例化。 通常，在试图实例化没有被标识为@Injectable()的类时，注入器会报错。
export class HeroService {

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
}
