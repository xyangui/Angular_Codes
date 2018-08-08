import {TestBed, inject, async} from '@angular/core/testing';

import {HeroService} from './hero.service';
import {HttpClientModule} from '@angular/common/http';
import {Hero} from "./hero";
import {flatMap} from 'rxjs/operators';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [HeroService]
    });
  });

  it('HeroService should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('test API get one hero should be ok', async(inject([HeroService], (service: HeroService) => {
    service.getHero(73).subscribe(
      (hero) => {
        expect(hero.id).toBe(73);
        expect(hero.name).not.toBeNull();
        expect(hero.name).toBe('Jason');
        expect(hero.age).toBe(122);
        expect(hero.comment).toBeNull();
      });
  })));


  it('test API get all hero should be ok', async(inject([HeroService], (service: HeroService) => {
    service.getHeroes().subscribe(
      (heroes) => {

        let hero:Hero = heroes.find(hero => hero.id === 1);
        expect(hero.id).toBe(1);
        expect(hero.name).toBe('mike');
        expect(hero.age).toBe(11);
        expect(hero.comment).toBe('');

        hero = heroes.find(hero => hero.id === 3);
        expect(hero.id).toBe(3);
        expect(hero.name).toBe('tom');
        expect(hero.age).toBe(33);
        expect(hero.comment).toBe('ggg');

        hero = heroes.find(hero => hero.id === 73);
        expect(hero.id).toBe(73);
        expect(hero.name).toBe('Jason');
        expect(hero.age).toBe(122);
        expect(hero.comment).toBeNull();
      });
  })));

  it('test API post, get, put, delete', async(inject([HeroService], (service: HeroService) => {

    let hero: Hero = new Hero();
    hero.name = 'Jason';
    hero.age = 41;

    // 方案1
    // service.post(hero).subscribe(
    //   resultJson => {
    //     expect(resultJson['result']).toBe('post_success');
    //
    //     service.getHero(resultJson['id']).subscribe(
    //       hero => {
    //         expect(hero.id).toBe(resultJson['id']);
    //         expect(hero.name).toBe('Jason');
    //         expect(hero.age).toBe(41);
    //         expect(hero.comment).toBeNull();
    //       });
    //   });

    // 方案2
    let id: number = 0;
    service.post(hero).pipe(
      flatMap(resultJson => {
        expect(resultJson['result']).toBe('post_success');

        id = resultJson['id'];
        return service.getHero(id);
      }),
      flatMap(hero => {
        expect(hero.id).toBe(id);
        expect(hero.name).toBe('Jason');
        expect(hero.age).toBe(41);
        expect(hero.comment).toBeNull();

        hero.name = 'ivan';
        hero.age = 30;
        hero.comment = 'lavarel';

        return service.put(hero);
      }),
      flatMap(resultJson => {
        expect(resultJson['result']).toBe('put_success');
        return service.getHero(id);
      }),
      flatMap(hero => {
        expect(hero.id).toBe(id);
        expect(hero.name).toBe('ivan');
        expect(hero.age).toBe(30);
        expect(hero.comment).toBe('lavarel');

        return service.delete(hero);
      }),
      flatMap(
        resultJson => {
          expect(resultJson['result']).toBe('delete_success');

          return service.getHero(id);
        })
    ).subscribe(hero => {
        expect(hero).toBeNull();
    });

  })));
});
