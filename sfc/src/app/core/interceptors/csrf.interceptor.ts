import axios, { AxiosRequestConfig } from 'axios';
import { prefixReq } from './http-config';
import { logMessage } from './log';

export function csrfInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    let token = 'your-csrf-token-goes-here';
    if (token) {
      config.headers['x-csrf-token'] = token;
      logMessage(`${prefixReq} 🦹‍♀️ CSRF`, [`Adding CSRF header`, token]);
    }
    return config;
  });
}
