import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get('/:id')
  @CacheKey('auto-caching-fake-model')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(100)
  async getPokemon(@Param('id') id: number): Promise<string> {
    console.log('Vine aqui');
    return await this.service.getPokemon(+id);
  }
}
