//Para Configuração do Axios
import axios from "axios";

const api = axios.create({
  baseURL: "http://SEU_BACKEND_URL_AQUI",
});

export default api;
