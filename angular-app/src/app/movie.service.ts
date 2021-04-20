import axios from 'axios';
import { API, parseList, Movie } from './core';

export async function getMovies() {
  try {
    const url = `${API}/movies`;
    const response = await axios.get(url);
    const movies: Movie[] = parseList(response);
    return movies;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
