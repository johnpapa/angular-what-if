import axios, { AxiosResponse } from 'axios';
import { prefixRes } from './http-config';
import { logMessage } from './log';

export function transformInterceptor() {
  axios.interceptors.response.use((response: AxiosResponse) => {
    const { data } = response;
    // If the response comes through as { data: ... }, strip the data off.
    const transformed = data.data || data;
    logMessage(`${prefixRes} 🚧 Transform Response`, [], [transformed]);
    response.data = transformed;
    return response;
  });
}
