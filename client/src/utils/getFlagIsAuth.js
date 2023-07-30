const Cookies = require("js-cookie");

const getFlagIsAuth = () => {
  return !!Cookies.get("refreshToken");
};

export default getFlagIsAuth;
