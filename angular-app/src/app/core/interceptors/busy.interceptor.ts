import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { prefixReq, prefixRes } from './http-config';
import * as busyService from '../busy.service';
import { logMessage } from './log';

const loadingMessage = 'Loading ...';
const savingMessage = 'Saving ...';

export function busyInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { method } = config;
    const msg = method === 'GET' ? loadingMessage : savingMessage;
    logMessage(`${prefixReq} ⚙️ Busy Spinner`, [
      'Incrementing the busy spinner',
    ]);
    busyService.increment(msg);
    return config;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      busyService.decrement();
      logMessage(`${prefixRes} ⚙️ Busy Spinner`, [
        'Decrementing the busy spinner',
      ]);
      return response;
    },
    (error) => {
      busyService.decrement();
      logMessage(`${prefixRes} ⚙️ Busy Spinner`, [
        'Decrementing the busy spinner',
      ]);
      return Promise.reject(error);
    },
  );
}
