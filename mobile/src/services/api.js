import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.2.18:3001',
});

export default api;