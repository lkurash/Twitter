import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkToken, getUserInfo } from "../http/userApi";
import { LOGIN_PAGE_NOT_AUTH } from "./constans";

export default function CheckTokenOnPage(user, navigate, loadingPage) {
  const location = useLocation().pathname;

  useEffect(() => {
    checkToken()
      .then((data) => {
        user.setAuth(true);
      })
      .finally(() => {
        loadingPage(false);
        if (!user.isAuth && location !== "/explore") {
          navigate(LOGIN_PAGE_NOT_AUTH);
        }
        if (user.isAuth) {
          getUserInfo().then((userInfo) => user.setUser(userInfo));
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
}
