import { TestBed, inject, async } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';

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

  it('should getInfo test service', async(inject([HeroService], (service: HeroService) => {
    service.getHero(21).subscribe(
      (successResult) => {
        expect(successResult.id).toBe(21);
        expect(successResult.name).toBe('jjjjj');
        expect(successResult.age).toBe(432);
        expect(successResult.comment).toBeNull();
        expect(successResult.name).not.toBeNull();
      });
  })));
});
