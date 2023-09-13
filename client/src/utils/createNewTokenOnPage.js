import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import { checkToken, getUserProfile } from "../http/userClient";

import getAuthUserID from "./getAuthUserID";

export default function CreateNewTokenOnPage(user, navigate, loadingPage) {
  const location = useLocation().pathname;

  //  useEffect(() => {
  //    checkToken()
  //      .then((data) => user.setAuth(true))
  //      .catch((error) => {
  //        console.log(error.response.data.message);
  //      });
  //  });

  // useEffect(() => {
  //   checkToken()
  //     .then((data) => user.setAuth(true))
  //     .finally(() => {
  //       loadingPage(false);
  //       if (!user.isAuth && location !== "/explore") {
  //         navigate(LOGIN_PAGE_PATH_NOT_AUTH);
  //       }
  //       if (user.isAuth) {
  //         const authUserID = getAuthUserID(user);
  //         return getUserProfile(authUserID).then((userInfo) => user.setUser(userInfo));
  //       }
  //     })
  //     .catch((error) => {
  //       if (localStorage.getItem('token')) {
  //         localStorage.removeItem('token')
  //       }
  //       console.log(error.response.data.message);
  //     });
  // });
}
