import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { auth, userProfileById } from "../../redux/user/user.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

import LoyoutProfilePage from "../../components/LoyoutProfilePage";
import loadPageUserInfo from "../../components/loadComponents/loadPageUserInfo";

const HomeProfileUserPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { loadingStatus } = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);

  const authUserID = getAuthUserID();

  useEffect(() => {
    dispatch(userActions.getUserProfileById(authUserID));
    if (isLoading || loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  if (isLoading || loadingStatus === "PENDING") {
    return loadPageUserInfo(isAuth);
  }

  return (
    <>
      {loadingStatus === "COMPLETE" && (
        <LoyoutProfilePage pathHomeProfileUser />
      )}
    </>
  );
};

export default HomeProfileUserPage;
