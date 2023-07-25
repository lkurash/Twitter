import jwt_decode from "jwt-decode";
const Cookies = require("js-cookie");

export default function getAuthUserID(user) {
  const token = Cookies.get("token");
  if (token) {
    const { id } = jwt_decode(token);
    return id;
  } else {
    return false;
  }
}
