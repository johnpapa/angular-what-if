import { Component, OnInit } from '@angular/core';
import { Villain } from '../core';
import * as villainService from './villain.service';

@Component({
  selector: 'app-Villains',
  template: `
    <div class="content-container">
      <app-list-header
        title="Villains"
        (add)="enableAddMode()"
        (refresh)="getVillains()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="villains">
          <app-villain-list
            *ngIf="!selected"
            [villains]="villains"
            [errorMessage]="errorMessage"
            (selected)="select($event)"
            (deleted)="askToDelete($event)"
          ></app-villain-list>
          <app-villain-detail
            *ngIf="selected"
            [villain]="selected"
            (unselect)="clear()"
            (save)="save($event)"
          ></app-villain-detail>
        </div>
      </div>

      <app-modal
        class="modal-villain"
        [message]="message"
        [isOpen]="showModal"
        (handleNo)="closeModal()"
        (handleYes)="deleteVillain()"
      ></app-modal>
    </div>
  `,
})
export class VillainsComponent implements OnInit {
  errorMessage: string;
  selected: Villain;
  villains: Villain[];
  message = '?';
  villainToDelete: Villain;
  showModal = false;

  async ngOnInit() {
    await this.getVillains();
  }

  async add(villain: Villain) {
    await villainService.addVillain(villain);
  }

  askToDelete(villain: Villain) {
    this.villainToDelete = villain;
    this.showModal = true;
    if (this.villainToDelete.name) {
      this.message = `Would you like to delete ${this.villainToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  async deleteVillain() {
    this.closeModal();
    if (this.villainToDelete) {
      await villainService.deleteVillain(this.villainToDelete);
      this.villainToDelete = null;
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  async getVillains() {
    this.errorMessage = undefined;
    try {
      this.villains = await villainService.getVillains();
    } catch (error) {
      this.errorMessage = error?.error?.message || 'Error occurred';
    }
    this.clear();
  }

  async save(villain: Villain) {
    if (this.selected && this.selected.name) {
      await this.update(villain);
    } else {
      await this.add(villain);
    }
  }

  select(villain: Villain) {
    this.selected = villain;
  }

  async update(villain: Villain) {
    await villainService.updateVillain(villain);
  }
}
