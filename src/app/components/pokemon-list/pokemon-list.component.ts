import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from 'src/app/models/pokemon-detail.interface';
import { PokemonList } from 'src/app/models/pokemon-list.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';


import { delay, finalize } from 'rxjs';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonList = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

  table: boolean = true;
  loaded: boolean = false;

  constructor(private pokemonsService: PokemonsService, private router: Router) {}

  ngOnInit(): void {
    this.loaded = false;
    this.pokemonsService.getPokemonList()
    .pipe(
      delay(1000),
      finalize(() => this.loaded = true)
    )
    .subscribe((pokemons) => this.pokemons = pokemons);
  }

  gridView() {
    this.table = true;
  }

  cardView() {
    this.table = false;
  }
}
