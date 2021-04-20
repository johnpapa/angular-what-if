import { AxiosResponse } from 'axios';

export const API = 'api/';

export const parseList = <T>(response: AxiosResponse) => {
  if (!response || !response?.status) {
    return [];
  }
  if (response?.status !== 200)
    throw Error(`Error, status ${response?.status}`);
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = <T>(response: AxiosResponse, code: number) => {
  if (response.status !== code) throw Error(`Error, status ${response.status}`);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item as T;
};
