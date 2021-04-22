import axios from 'axios';
import { API, parseItem, parseList, Villain } from '../core';

export async function getVillains() {
  try {
    const url = `${API}/villains`;
    const response = await axios.get(url);
    const villains: Villain[] = parseList(response);
    return villains;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteVillain(villain: Villain) {
  try {
    const url = `${API}/villains/${villain.id}`;
    const response = await axios.delete(url);
    parseItem<Villain>(response, 200);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function updateVillain(villain: Villain) {
  try {
    const data = JSON.stringify(villain);
    const url = `${API}/villains/${villain.id}`;
    const response = await axios.put(url, data);
    const updatedVillain: Villain = parseItem<Villain>(response, 200);
    return updatedVillain;
  } catch (error) {
    console.error(error);
  }
}

export async function addVillain(villain: Villain) {
  try {
    const data = JSON.stringify(villain);
    const url = `${API}/villains`;
    const response = await axios.post(url, data);
    const addedVillain: Villain = parseItem<Villain>(response, 201);
    return addedVillain;
  } catch (error) {
    console.error(error);
  }
}
