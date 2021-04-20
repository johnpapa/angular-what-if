import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { logError, prefixReq } from './http-config';
import * as sessionService from '../session.service';
import { logErrorMessage, logMessage } from './log';

export function readOnlyInterceptor() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { enforceReadOnly } = sessionService;
      const isGet = config.method.toLowerCase() !== 'get';
      if (!isGet && enforceReadOnly && !okIfReadOnly(config)) {
        const msg = `Can't ${config.method} ${config.url} when read-only`;
        logErrorMessage(`${prefixReq} 👓 Read-Only`, [msg]);
        const err = new Error(msg) as AxiosError;
        return Promise.reject(err);
      }
      logMessage(`${prefixReq} 👓 Read-Only`, ['Pass. Data is not read-only']);
      return config;
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );
}

function okIfReadOnly(config: AxiosRequestConfig) {
  /**
   * Put allowList of routes here.
   * Routes added here will be allowed to be modifed.
   */
  const allowList = [/api\/movies/gi, /api\/signin/gi];
  return allowList.some((item) => item.test(config.url));
}
