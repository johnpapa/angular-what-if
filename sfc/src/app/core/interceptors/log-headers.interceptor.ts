import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';
import { logMessage } from './log';

export function logHeadersInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { headers, method, url } = config;
    logMessage(`${prefixReq} ⚽️ Headers`, [`${method} "${url}"`], [headers]);
    return config;
  });
}
