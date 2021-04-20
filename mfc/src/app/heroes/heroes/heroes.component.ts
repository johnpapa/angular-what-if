import { Component, OnInit } from '@angular/core';
import { Hero } from '../../core';
import * as heroService from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
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
