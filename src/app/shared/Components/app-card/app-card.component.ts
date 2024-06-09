import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon-list.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
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
export class AppCardComponent {
  @Input() item: PokemonList = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

}
