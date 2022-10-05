import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    // check if data is in cache:
    const cachedData = await this.cacheService.get<any>(
      'auto-caching-fake-model',
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }

    // if not, call API and set the cache:
    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/`,
    );
    for( let iterar = 0; iterar<40; iterar ++ ){
      await this.httpService.axiosRef.get(
        `https://pokeapi.co/api/v2/pokemon/`,
      );
    }
    await this.cacheService.set('auto-caching-fake-model', data.results);
    const response =  data.results.map( (item) => {
      return {
        name: item.name
      };
    });
    return response;
  }
}
