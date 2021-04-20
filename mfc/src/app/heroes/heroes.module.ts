import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, HeroesComponent],
  declarations: [HeroesComponent, HeroListComponent, HeroDetailComponent],
})
export class HeroesModule {}
