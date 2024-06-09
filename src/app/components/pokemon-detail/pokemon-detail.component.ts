import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from 'src/app/models/pokemon-detail.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children: FileNode[] = [];
  filename: string = '';
  type: any;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: PokemonDetail = {
    id: 0,
    height: 0,
    name: 'MissingNo.',
    abilities: {},
    stats: {},
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png' },
    base_experience: 0,
    weight: 0
  };

  treeData: FileNode[] = [];
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor (
    private pokemonsService: PokemonsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = this.treeData;
  }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (identifier) {
      this.pokemonsService.getPokemonDetail(identifier).subscribe((pokemon) => {
        if (!pokemon) {
          this.router.navigateByUrl('/');
        }
        else {
          this.pokemon = pokemon;
          this.initialize();
        } 
      },
      (error: HttpErrorResponse) => {
        this.router.navigateByUrl('/');
      });
    }
  }
    

    initialize(): void {
      // Parse the string to json object.
      const json = JSON.stringify({
        id: this.pokemon.id,
        height: this.pokemon.height,
        name: this.pokemon.name,
        abilities: this.pokemon.abilities,
        stats: this.pokemon.stats,
        base_experience: this.pokemon.base_experience,
        weight: this.pokemon.weight
      });
      const dataObject = JSON.parse(json);
  
      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      this.treeData = this.buildFileTree(dataObject, 0);

      this.nestedDataSource.data = this.treeData;
    }
  



  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key as keyof typeof obj];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
}
