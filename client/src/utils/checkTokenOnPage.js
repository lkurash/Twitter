const Cookies = require("js-cookie");

const checkTokenOnPage = () => {
  if (Cookies.get("refreshToken")) {
    return true;
  } else {
    return false;
  }
};

export default checkTokenOnPage;
