import { Pokemon } from "./pokemon.interface";

export interface PokemonList {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}