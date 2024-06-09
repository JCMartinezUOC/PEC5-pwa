import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonList } from '../models/pokemon-list.interface';
import { Observable } from 'rxjs';
import { PokemonDetail } from '../models/pokemon-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonDetail(id: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>('https://pokeapi.co/api/v2/pokemon/' + id);
  }
}
