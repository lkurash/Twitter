import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import usersClient from "../http/usersClient";
import LocalAuthClient from "../store/LocalAuthClient";

const authenticate = async () => {
  const token = await usersClient
    .createRefreshToken()
    .then((result) => LocalAuthClient.setRefreshToken(result.token))
    .catch((error) => {
      console.log(error.response.data.message);
    });
  if (token) {
    return null;
  } else {
    Cookies.remove("twitsWhoReading");
    return redirect("/auth/login/redirect");
  }
};

export default authenticate;
