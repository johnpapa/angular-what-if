import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Hero } from '../../core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  @Input() errorMessage = undefined;
  @Input() heroes: Hero[];
  @Output() deleted = new EventEmitter<Hero>();
  @Output() selected = new EventEmitter<Hero>();

  trackByHero(index: number, hero: Hero): number {
    return hero.id;
  }

  selectHero(hero: Hero) {
    this.selected.emit(hero);
  }

  deleteHero(hero: Hero) {
    this.deleted.emit(hero);
  }
}
