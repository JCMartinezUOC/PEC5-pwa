import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PokemonList } from 'src/app/models/pokemon-list.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0.2,
        })
      ),
      transition('void <=> *', animate(1500)),
    ]),
  ],
})
export class AppGridComponent {
  @Input() item: PokemonList = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

  displayedColumns: string[] = ['index','name','url'];
}
