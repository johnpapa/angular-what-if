import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';
import { logMessage } from './log';

export function ensureSSLInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const localhostExp = /http:\/\/localhost/gi;
    if (!localhostExp.test(config.url)) {
      const before = config.url;
      const after = before.replace('http://', 'https://');
      config.url = after;
      logMessage(`${prefixReq} 🔐 SSL`, [
        'Rerouting all traffic to SSL',
        `URL transformed from ${before} to ${after}`,
      ]);
    }
    return config;
  });
}
