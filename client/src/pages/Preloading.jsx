import { useDispatch, useSelector } from "react-redux";
import getAuthUserID from "../utils/getAuthUserID";
import AppLayout from "./AppLayout";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import { userActions } from "../redux/user/user.actions";
import { visibilityPageActions } from "../redux/visibilityPage/visibilityPage.actions";
import { useEffect, useState } from "react";

const Preloading = () => {
  const authUserID = getAuthUserID();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

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
