import axios from "axios";
import env from "react-dotenv";
const Cookies = require("js-cookie");

let BASE_URL = `${env.API_SCHEMA}://${env.API_HOST}`;
BASE_URL += env.API_PORT ? `:${env.API_PORT}` : "";

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
