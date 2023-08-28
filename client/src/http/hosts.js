import axios from "axios";
const Cookies = require("js-cookie");

const URL = "http://localhost:5500";

const $host = axios.create({
  baseURL: URL,
});

const $authHost = axios.create({
  baseURL: URL,
});

const authInterceptor = (config) => {

  config.headers.authorization = `Bearer ${Cookies.get("token")}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
