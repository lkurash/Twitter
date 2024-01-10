import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import userClient from "../http/userClient";
import localAuthClient from "../store/LocalAuthClient";

const authenticate = async () => {
  const token = await userClient
    .createRefreshToken()
    .then((result) => localAuthClient.setRefreshToken(result.token))
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
