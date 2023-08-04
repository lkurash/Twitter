import { redirect } from "react-router-dom";
import userApi from "../http/userApi";
import LocalAuthClient from "../store/LocalAuthClient";

const authenticate = async () => {
  const token = await userApi
    .createRefreshToken()
    .then((result) => LocalAuthClient.setRefreshToken(result.token))
    .catch((error) => {
      console.log(error.response.data.message);
    });
  if (token) {
    return "null";
  } else {
    return redirect("/authentication/redirect");
  }
};
export default authenticate;
