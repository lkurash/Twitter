import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/user.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import LoyoutProfilePage from "../../components/LoyoutProfilePage";

const HomeProfileUserPage = observer(() => {
  const dispatch = useDispatch();

  const authUserID = getAuthUserID();

  useEffect(() => {
    dispatch(userActions.getUserProfileById(authUserID));
  }, []);

  return (
    <>
      <LoyoutProfilePage pathHomeProfileUser />
    </>
  );
});

export default HomeProfileUserPage;
