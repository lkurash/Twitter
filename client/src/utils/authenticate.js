import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import userAPI from "../http/userAPI";
import LocalAuthClient from "../store/LocalAuthClient";

const authenticate = async () => {
  const token = await userAPI
    .createRefreshToken()
    .then((result) => LocalAuthClient.setRefreshToken(result.token))
    .catch((error) => {
      console.log(error.response.data.message);
    });

  if (token) {
    return null;
  } else {
    Cookies.remove("twitsWhoReading");
    return redirect("/auth");
  }
};

export default authenticate;
