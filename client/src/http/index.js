import axios from "axios";
const Cookies = require("js-cookie");

const $host = axios.create({
  baseURL: "http://localhost:5500",
});

const $authHost = axios.create({
  baseURL: "http://localhost:5500",
});

const authInterceptor = (config) => {

  config.headers.authorization = `Bearer ${Cookies.get("token")}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
