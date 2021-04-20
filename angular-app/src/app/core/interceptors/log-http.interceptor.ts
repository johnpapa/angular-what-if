import axios, { AxiosRequestConfig } from 'axios';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  logError,
  prefixReq,
  prefixRes,
} from './http-config';
import { logMessage } from './log';

export function logHttpInterceptor() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfigExtended) => {
      const started = Date.now();
      config.meta = { started };
      return logRequest(config);
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponseExtended) => {
      return logResponse(response);
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    },
  );

  function logRequest(config: AxiosRequestConfig) {
    logMessage(`${prefixReq} 📝 Log Http Request`, [
      `${config.method} "${config.url}"`,
    ]);
    return config;
  }

  function logResponse(response: AxiosResponseExtended) {
    if (!response || !response?.config) {
      logMessage(`${prefixRes} 📝 Log Http Response`, [`response returned`]);
    } else {
      const { config, status } = response;
      const { started } = config?.meta;
      const elapsed = Date.now() - started;
      logMessage(`${prefixRes} 📝 Log Http Response`, [
        `HTTP: Response for ${config?.url}\nreturned with status ${status}\nand took ${elapsed} ms`,
      ]);
    }

    return response;
  }
}
