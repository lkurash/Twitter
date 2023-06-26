import { useEffect } from "react";
import { checkToken } from "../http/userApi";
import { LOGIN_PAGE_NOT_AUTH } from "./constans";

export default function CheckTokenOnPage(user, navigate, loadingPage) {
  useEffect(() => {
    checkToken()
      .then((data) => {
        user.setAuth(true);
      })
      .finally(() => {
        loadingPage(false);
        if (!user.isAuth) {
          navigate(LOGIN_PAGE_NOT_AUTH);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
}
