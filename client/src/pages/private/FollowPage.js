import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { userProfileById } from "../../redux/user/user.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

import FollowPageContent from "../../components/FollowPageContent";

const FollowPage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(userProfileById);
  const { id } = useParams();
  const authUserID = getAuthUserID();

  useEffect(() => {
    dispatch(userActions.getUserProfileById(id || authUserID));
  }, []);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }
  return (
    <>
      <FollowPageContent />
    </>
  );
});

export default FollowPage;
