import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getAuthUserID from "../../utils/getAuthUserID";

import ContentFollowPage from "../../components/ContentFollowPage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { userProfileById } from "../../redux/user/user.selectors";

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
      <ContentFollowPage />
    </>
  );
});

export default FollowPage;
