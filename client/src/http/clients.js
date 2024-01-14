import axios from "axios";
const Cookies = require("js-cookie");

let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

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
