import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sandbox.v2.pedidopago.com.br/',
});

export default api;
