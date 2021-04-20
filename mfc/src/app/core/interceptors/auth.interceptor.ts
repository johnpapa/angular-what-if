import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { prefixReq } from './http-config';
import { logMessage } from './log';

import * as sessionService from '../session.service';
import { getRouter } from '../get-router';

export function authInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { accessToken } = sessionService;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.withCredentials = true;
      logMessage(`${prefixReq} 🔑 Auth`, [`Adding Auth header`]);
    } else {
      logMessage(`${prefixReq} 🔑 Auth`, [`No Auth Token to add`]);
    }

    return config;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        const authHeader = error.config.headers['WWW-Authenticate'];
        const router = getRouter();
        if (/is expired/.test(authHeader)) {
          router.navigate(['signin']);
        } else {
          router.navigate(['authfailed']);
        }
        return Promise.resolve(true);
      }
      return Promise.reject(error);
    },
  );
}
