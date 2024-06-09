export interface PokemonDetail {
    id: number;
    height: number;
    name: string;
    abilities: {}
    stats: {}
    sprites: { front_default: string; }
    base_experience: number;
    weight: number;
}