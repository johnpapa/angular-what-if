import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Villain } from '../../core';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VillainListComponent {
  @Input() errorMessage = undefined;
  @Input() villains: Villain[];
  @Output() deleted = new EventEmitter<Villain>();
  @Output() selected = new EventEmitter<Villain>();

  trackByVillain(index: number, villain: Villain): number {
    return villain.id;
  }

  selectVillain(villain: Villain) {
    this.selected.emit(villain);
  }

  deleteVillain(villain: Villain) {
    this.deleted.emit(villain);
  }
}
