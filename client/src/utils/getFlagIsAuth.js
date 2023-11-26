const Cookies = require("js-cookie");

const getFlagIsAuth = () => {
  return !!Cookies.get("token");
};

export default getFlagIsAuth;
