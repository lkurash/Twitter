import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { isAuth } from "../../redux/user/user.sagas";
import { userProfileById } from "../../redux/user/user.selectors";

import LoyoutProfilePage from "../../components/LoyoutProfilePage";
import loadPageUserInfo from "../../components/loadComponents/loadPageUserInfo";


const ProfileUserPage = observer(() => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { loadingStatus } = useSelector(userProfileById);

  const { id } = useParams();

  useEffect(() => {
    dispatch(userActions.getUserProfileById(id));
    if (isLoading || loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [id]);

  if (isLoading || loadingStatus === "PENDING") {
    return loadPageUserInfo(isAuth);
  }

  return <>{loadingStatus === "COMPLETE" && <LoyoutProfilePage />}</>;
});

export default ProfileUserPage;
