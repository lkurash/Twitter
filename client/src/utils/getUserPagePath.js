import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "./routs";
import path from "./path";

const getUserPagePath = (isAuth, id) => {
  if (isAuth) {
    return path(USER_PAGE_PATH, id);
  } else {
    return path(PUBLIC_USER_PAGE_PATH, id);
  }
};

export default getUserPagePath;
