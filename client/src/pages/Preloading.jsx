import { useDispatch } from "react-redux";
import { userActions } from "../redux/user/user.actions";
import { visibilityPageActions } from "../redux/visibilityPage/visibilityPage.actions";
import { useEffect, useState } from "react";

import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";

import AppLayout from "./AppLayout";

const Preloading = () => {
  const authUserID = getAuthUserID();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUserID) {
      dispatch(userActions.getAuth(getFlagIsAuth()));
      dispatch(visibilityPageActions.getContentForAuthUser(authUserID));
      setIsLoading(true);
    } else {
      dispatch(visibilityPageActions.getContentForNotAuthUser());
      setIsLoading(true);
    }
  }, [authUserID]);

  return <>{isLoading && <AppLayout />}</>;
};
export default Preloading;
