import { redirect } from "react-router-dom";
import { createRefreshToken } from "../http/userApi";
import { LOGIN_PAGE } from "./constans";

const authorization = async () => {
  const token = await createRefreshToken().catch((error) => {
    console.log(error.response.data.message);
  });
  if (token) {
    return "null";
  } else {
    return redirect(LOGIN_PAGE);
  }
};
export default authorization;
