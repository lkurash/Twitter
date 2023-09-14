import axios from "axios";
const Cookies = require("js-cookie");

const BASE_URL = "http://localhost:5500";

const $client = axios.create({
  baseURL: BASE_URL,
});

const $authClient = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${Cookies.get("token")}`;

  return config;
};

$authClient.interceptors.request.use(authInterceptor);

export { $client, $authClient };
