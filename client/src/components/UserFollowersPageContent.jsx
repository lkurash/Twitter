import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { userActions } from "../redux/user/user.actions";

import getAuthUserID from "../utils/getAuthUserID";

import { useParams } from "react-router-dom";

import UserFollowersList from "./UserFollowersList";

const UserFollowersPageContent = observer(() => {
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    dispatch(userActions.getFollowers(id || authUserID));
  }, []);

  return (
    <div className="user-follow-list">{isLoading && <UserFollowersList />}</div>
  );
});

export default UserFollowersPageContent;
