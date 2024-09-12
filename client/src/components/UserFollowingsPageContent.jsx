import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { userActions } from "../redux/user/user.actions";
import { useParams } from "react-router-dom";

import getAuthUserID from "../utils/getAuthUserID";

import UserFollowingList from "./UserFollowingList";

const UserFollowingPageContent = () => {
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    dispatch(userActions.getFollowings(id || authUserID));
  }, []);

  return (
    <div className="user-follow-list">{isLoading && <UserFollowingList />}</div>
  );
};

export default UserFollowingPageContent;
