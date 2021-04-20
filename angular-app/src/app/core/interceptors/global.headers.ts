import axios from 'axios';

export function globalHeaders() {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
}
