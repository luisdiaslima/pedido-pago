import axios from 'axios';

const jwt = localStorage.getItem('@PedidosPago:Authorization');
const api = axios.create({
  baseURL: 'https://api.sandbox.v2.pedidopago.com.br/',
  headers: { Authorization: `Bearer ${jwt}` },
});

api.interceptors.request.use(async config => {
  if (jwt) {
    config.headers.Authorization = `Authorization ${jwt}`;
  }
  return config;
});

export default api;
