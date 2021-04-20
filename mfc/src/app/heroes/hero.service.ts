import axios from 'axios';
import { API, parseList, Hero, parseItem } from '../core';

export async function getHeroes() {
  try {
    const url = `${API}/heroes`;
    const response = await axios.get(url);
    const heroes: Hero[] = parseList(response);
    return heroes;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteHero(hero: Hero) {
  try {
    const url = `${API}/heroes/${hero.id}`;
    const response = await axios.delete(url /* { headers } */);
    parseItem<Hero>(response, 200);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function updateHero(hero: Hero) {
  try {
    const data = JSON.stringify(hero);
    const url = `${API}/heroes/${hero.id}`;
    const response = await axios.put(url, data /* { headers } */);
    const updatedHero: Hero = parseItem<Hero>(response, 200);
    return updatedHero;
  } catch (error) {
    console.error(error);
  }
}

export async function addHero(hero: Hero) {
  try {
    const data = JSON.stringify(hero);
    const url = `${API}/heroes`;
    const response = await axios.post(url, data /* { headers } */);
    const addedHero: Hero = parseItem<Hero>(response, 201);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
