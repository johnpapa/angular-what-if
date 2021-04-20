import { Component, OnInit } from '@angular/core';
import { Hero } from '../core';
import * as heroService from './hero.service';

@Component({
  selector: 'app-heroes',
  template: `
    <div class="content-container">
      <app-list-header
        title="Heroes"
        (add)="enableAddMode()"
        (refresh)="getHeroes()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="heroes">
          <app-hero-list
            *ngIf="!selected"
            [heroes]="heroes"
            [errorMessage]="errorMessage"
            (selected)="select($event)"
            (deleted)="askToDelete($event)"
          ></app-hero-list>
          <app-hero-detail
            *ngIf="selected"
            [hero]="selected"
            (unselect)="clear()"
            (save)="save($event)"
          ></app-hero-detail>
        </div>
      </div>

      <app-modal
        class="modal-hero"
        [message]="message"
        [isOpen]="showModal"
        (handleNo)="closeModal()"
        (handleYes)="deleteHero()"
      ></app-modal>
    </div>
  `,
})
export class HeroesComponent implements OnInit {
  errorMessage: string;
  selected: Hero;
  heroes: Hero[];
  message = '?';
  heroToDelete: Hero;
  showModal = false;

  async ngOnInit() {
    await this.getHeroes();
  }

  add(hero: Hero) {
    heroService.addHero(hero);
  }

  askToDelete(hero: Hero) {
    this.heroToDelete = hero;
    this.showModal = true;
    if (this.heroToDelete.name) {
      this.message = `Would you like to delete ${this.heroToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  async deleteHero() {
    this.closeModal();
    if (this.heroToDelete) {
      await heroService.deleteHero(this.heroToDelete);
      this.heroToDelete = null;
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  async getHeroes() {
    this.errorMessage = undefined;
    try {
      this.heroes = await heroService.getHeroes();
    } catch (error) {
      this.errorMessage = error?.error?.message || 'Error occurred';
    }
    this.clear();
  }

  async save(hero: Hero) {
    if (this.selected && this.selected.name) {
      await this.update(hero);
    } else {
      await this.add(hero);
    }
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  async update(hero: Hero) {
    await heroService.updateHero(hero);
  }
}
