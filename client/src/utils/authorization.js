import { redirect } from "react-router-dom";
import { createRefreshToken } from "../http/userApi";

const authorization = async () => {
  const token = await createRefreshToken().catch((error) => {
    console.log(error.response.data.message);
  });
  if (token) {
    return "null";
  } else {
    return redirect("/authentication/redirect");
  }
};
export default authorization;
